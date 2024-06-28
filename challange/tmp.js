// setImmediate(() => console.log(1));
// console.log(2);
// Promise.resolve().then(() =>
//   setTimeout(() => {
//     setImmediate(() => console.log(3));
//     console.log(4);
//     Promise.resolve().then(() =>
//       setImmediate(() => {
//         setImmediate(() => console.log(5));
//         console.log(6);
//         Promise.resolve().then(() => {
//           setImmediate(() => console.log(7));
//           console.log(8);
//         });
//       })
//     );
//   }, 0)
// );
const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
const sleep_im = () => new Promise((r) => setImmediate(r));
(async () => {
  setImmediate(() => console.log(1));
  console.log(2);
  await sleep_st(0);
  setImmediate(() => console.log(3));
  console.log(4);
  await sleep_im();
  setImmediate(() => console.log(5));
  console.log(6);
  await 1;
  setImmediate(() => console.log(7));
  console.log(8);
})();
