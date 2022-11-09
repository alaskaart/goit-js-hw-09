import Notiflix from "notiflix";

const formEl = document.querySelector(".form");
formEl.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.warning(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, delay);
      }),
      (delay += step);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promiseEl = { position, delay };
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promiseEl);
    } else {
      reject(promiseEl);
    }
  });
}
