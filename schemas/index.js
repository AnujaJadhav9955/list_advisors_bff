const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;
const { faker } = require("@faker-js/faker");
const AdvisorType = require("./TypeDefs/AdvisorType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Advisors: {
      type: new GraphQLList(AdvisorType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        const advisorsArray = [];
        for (let i = 0; i < 20; i++) {
          let record = faker.helpers.uniqueArray(
            [
              {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                jobTitle: faker.person.jobTitle(),
                desciption: faker.person.bio(),
                badge: faker.image.avatarGitHub(),
                image: faker.image.avatar(),
                status: faker.helpers.arrayElement(["online", "offline"]),
                review: faker.number.int({ min: 0, max: 5 }),
                languages: faker.helpers.arrayElements([
                  "german",
                  "english",
                  "french",
                  "spanish",
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
