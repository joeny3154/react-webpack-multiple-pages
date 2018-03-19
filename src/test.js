
let func = () => console.log('func')

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

class B {
  // static name = 'name'
  static sayHello() {
    console.log('hello')
  }
  sayHi() {
    console.log('hi')
  }
}
const b = new B()
b.sayHi()
// console.log(B.name)
console.log(B.sayHello())

const elements = [1, 2, 3].map((item, index) => {
  return (
    <div key={index}>{item}</div>
  )
})

console.log(elements)
