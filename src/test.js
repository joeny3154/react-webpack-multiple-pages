
// import 'babel-polyfill';

// const React = require('react');
// const elements = [1, 2, 3].map((item) => {
//   return (
//     <div>{item}</div>
//   )
// });

// console.log(elements);

console.log(Object.values({ 1: 2 }));

console.log(Array.isArray([]));

console.log('foo'.includes('f'))

async function a() {
  console.log('begin');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000)
  })
  console.log('done');
}
a();