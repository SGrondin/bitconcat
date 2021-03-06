# bitconcat

A simple Javascript library to append and prepend up to 25 bits at a time to a bitstream. It will group bits together into bytes whenever possible. Useful for compression and stream algorithms. More documentation and a lot of information about this project is available [here](http://simongrondin.name/?p=91).

## Installation

__Node__
```javascript
npm install bitconcat
```
__Browser__
```
bower install bitconcat
```
or
```html
<script src="bitconcat.min.js" type="text/javascript"></script>
```

## Usage

Begin by creating an instance of bitconcat.
```javascript
// If Node
var bitconcat = require("bitconcat");

var bc = new bitconcat();
```
That instance can now be thought of as the efficient, mathematical equivalent of a string containing ones and zeroes.

Now append or prepend data to it:
```javascript
bc.append(9, 4); //1001
```
That appends 1001 to the stream. That's 4 bits, repesenting the number 9 in binary.
Our string would be "1001".

```javascript
bc.prepend(15, 4); //1111
```
Now the instance contains 11111001, which is enough to form a full byte. getData() is used to retrieve all the available full bytes.
```javascript
bc.getData(); //Returns [249]
```

Calling pad() will append just enough zeroes to create an additional full byte, only if there's a number of bits not divisible by 8.

getNbBits() returns the number of bits in the instance.

Note: Due to Javascript's limitations, it is not possible to append or prepend more than 25 bits at a time without losing data. Call prepend() and append() multiple times instead.

Note: For optimal performance, when prepending bits, only call getData() once after prepending everything. Basically, do not alternate between calling prepend() and getData().

## Example

```javascript
bc = new bitconcat();
bc.append(46, 6);   //Appends 101110
bc.append(5, 4);    //Appends 0101
bc.append(0, 4);    //Appends 0000
bc.append(819, 10); //Appends 1100110011
```
The instance now contains 24 bits (6+4+4+10). Calling getData() will return an array containing 3 bytes.
```javascript
bc.getData(); //Returns [185, 67, 51]

// 10111001 01000011 00110011
// 185      67       51
```

A lot more examples and documentation is available [here](http://simongrondin.name/?p=91).


