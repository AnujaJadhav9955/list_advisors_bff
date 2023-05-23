const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLID, GraphQLString } = graphql;
const { faker } = require("@faker-js/faker");


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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Advisors: {
      type: new GraphQLList(AdvisorType),
      resolve() {
        let advisorsArray = [];
        for (let i = 0; i < 12; i++) {
          let record = faker.helpers.uniqueArray(
            [
              {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                jobTitle: faker.person.jobTitle(),
                desciption: faker.person.bio(),
                badge: faker.image.avatarGitHub(),
                image: faker.image.avatar(),
                status: faker.helpers.arrayElement(["Online", "Offline"]),
                review: faker.number.int({ min: 0, max: 5 }),
                languages: faker.helpers.arrayElements([
                  "German",
                  "English",
                  "French",
                  "Spanish",
                ]),
              },
            ],
            10
          );
          advisorsArray.push(...record);
        }
        return advisorsArray;
      },
      reject() {
        return "Graphql error";
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
