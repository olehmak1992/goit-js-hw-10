import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const status = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        return resolve(delay);
      } else {
        return reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: 'ERROR',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
  form.reset();
}
