# Writing Custom Type GraphQL

```js
import { GraphQLScalarType } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

const myCustomScalarType = new GraphQLScalarType({
    name: "MyCustomScalar",
    description: "Description of my custom scalar type",
    serialize(value) {
        let result;
        // Implement your own behavior here by setting the 'result' variable
        return result;
    },
    parseValue(value) {
        let result;
        // Implement your own behavior here by setting the 'result' variable
        return result;
    },
    parseLiteral(ast) {
        switch (
            ast.kind
            // Implement your own behavior here by returning what suits your needs
            // depending on ast.kind
        ) {
        }
    }
});

const schemaString = `

scalar MyCustomScalar

type Foo {
  aField: MyCustomScalar
}

type Query {
  foo: Foo
}

`;

const resolverFunctions = {
    MyCustomScalar: myCustomScalarType
};

const jsSchema = makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: resolverFunctions
});
```

# GraphQL Date Scalar Type Example

```js
var assertErr = require("assert-err");
var GraphQLScalarType = require("graphql").GraphQLScalarType;
var GraphQLError = require("graphql/error").GraphQLError;
var Kind = require("graphql/language").Kind;

module.exports = new GraphQLScalarType({
    name: "Date",
    /**
     * Serialize date value into string
     * @param  {Date} value date value
     * @return {String} date as string
     */
    serialize: function(value) {
        assertErr(
            value instanceof Date,
            TypeError,
            "Field error: value is not an instance of Date"
        );
        assertErr(
            !isNaN(value.getTime()),
            TypeError,
            "Field error: value is an invalid Date"
        );
        return value.toJSON();
    },
    /**
     * Parse value into date
     * @param  {*} value serialized date value
     * @return {Date} date value
     */
    parseValue: function(value) {
        var date = new Date(value);
        assertErr(
            !isNaN(date.getTime()),
            TypeError,
            "Field error: value is an invalid Date"
        );
        return date;
    },
    /**
     * Parse ast literal to date
     * @param  {Object} ast graphql ast
     * @return {Date} date value
     */
    parseLiteral: function(ast) {
        assertErr(
            ast.kind === Kind.STRING,
            GraphQLError,
            "Query error: Can only parse strings to dates but got a: " +
                ast.kind,
            [ast] "
        );

        var result = new Date(ast.value);
        assertErr(
            !isNaN(result.getTime()),
            GraphQLError,
            "Query error: Invalid date",
            [ast]
        );
        assertErr(
            ast.value === result.toJSON(),
            GraphQLError,
            "Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ",
            [ast]"
        );

        return result;
    }
});
```
