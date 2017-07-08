Recurrent neural nets take *much* longer to run! And return different formats.

Example:

```
const brain = require('brain.js');
const nn = new brain.NeuralNetwork();
const rnn = new brain.recurrent.RNN();
const data = [{input: [0, 0], output: [0]},
              {input: [0, 1], output: [1]},
              {input: [1, 0], output: [1]},
              {input: [1, 1], output: [0]}];

nn.train(data); // Takes 30ms
nnOutput = nn.run([1, 0]);  // Takes 0 ms -> Float64Array [ 0.9333382314039036 ]

rnn.train(data); // Takes 9505ms
rnnOutput = rnn.run([1, 0]);  // Takes 10 ms -> 1
```

More usage examples:

```
const brain = require('brain.js');
const net = new brain.NeuralNetwork();

net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

const output = net.run({ r: 1, g: 0.4, b: 0 })

console.log(output.white > output.black ? 'white' : 'black'); // -> 'white'

```