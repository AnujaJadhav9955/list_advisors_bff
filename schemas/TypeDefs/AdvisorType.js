const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } =
  graphql;

const AdvisorType = new GraphQLObjectType({
  name: "Advisor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    desciption: { type: GraphQLString },
    badge: { type: GraphQLString },
    image: { type: GraphQLString },
    status: { type: GraphQLString },
    review: { type: GraphQLInt },
    languages: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = AdvisorType;
