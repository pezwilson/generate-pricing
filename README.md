# generate-pricing

This is a simple Node.js application that accepts input in a specific format and calculates sales taxes.

An example of the input format is the following:

```
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
3 imported boxes of chocolates at 11.25
```
The application assumes that all line item data conforms to the above format.

That input generates the following output:

```
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported box of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38
```

Each line item will have a sales tax of 10% unless it's for books, food, or medical products. There is an additional 5% sales tax for imported goods.

Sales tax is generated on a per unit basis and rounded up to the nearest $.05.

## Usage

To install the application:

```npm install```

To run the default example, cd to the src directory and run:

```node index.js```

To run the test suite, enter:

```npm test```
