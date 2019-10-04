const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean } = graphql;
const { GraphQLUpload } = require('graphql-upload')
const CCategory = require('../Model/Category')
const SubCategory = require('../Model/SubCategory')
const Product = require('../Model/Products')

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        SubCategory: {
            type: new GraphQLList(SubCategoryType),
            resolve(parent, args) {
                // code here to get the data from database
                return SubCategory.find({ catID: parent.id })
            }
        }
    })
})


const SubCategoryType = new GraphQLObjectType({
    name: 'SubCategory',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        catID: { type: GraphQLID },
        Products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                // Code to get data from database
                return Product.find({ subCatID: parent.id })
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        price: { type: GraphQLInt },
        pic: { type: GraphQLString },
        catID: { type: GraphQLID },
        subCatID: { type: GraphQLID }
    })
})

// Image Upload Schema 
const FileStat = new GraphQLObjectType({
    name: 'FileStat',
    fields: () => ({
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        size: { type: GraphQLInt },
        path: { type: GraphQLString }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // Show the Category(id: xx)
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from database
                return CCategory.findById(args.id)
            }
        },


        // Show all categories 
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                // code to get data from database
                return CCategory.find({})
            }
        },

        // Show only one SubCategory 
        Subcategory: {
            type: SubCategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from database
                return SubCategory.findById(args.id)
            }
        },

        // Show All SubCategories
        Subcategories: {
            type: new GraphQLList(SubCategoryType),
            resolve(parent, args) {
                // code to get data from database
                return SubCategory.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let category = new CCategory({
                    name: args.name,
                })
                category.save()
                return args.name
            }
        },

        // Add SubCategory 
        addSubCategory: {
            type: SubCategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                catID: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                let subCategory = await new SubCategory({
                    name: args.name,
                    catID: args.catID
                })
                return subCategory.save()

            }
        },


        // Add Products
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                model: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                pic: { type: new GraphQLNonNull(GraphQLString) },
                catID: { type: new GraphQLNonNull(GraphQLID) },
                subCatID: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                let product = await new Product({
                    name: args.name,
                    model: args.model,
                    price: args.price,
                    pic: args.pic,
                    catID: args.catID,
                    subCatID: args.subCatID
                })
               return product.save()
            }
        },

        // Upload 
        uploadFile: {
            type: FileStat,
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) }
            },
            async resolve(parent, args) {
                const { filename, mimetype} = await args.file
                
                return {filename, mimetype}
            }

        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})