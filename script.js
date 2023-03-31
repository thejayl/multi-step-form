'use strict';

const data = {
  plan: '',
  planOp: '',
  addOns: {
    online: {
      activate: false,
      price: 0,
      title: 'Online service',
    },
    storage: {
      activate: false,
      price: 0,
      title: 'Larger storage',
    },
    profile: {
      activate: false,
      price: 0,
      title: 'Customizable Profile',
    },
  },
};

const sectionAll = document.querySelectorAll('.section');
const section1FormItemAll = document.querySelectorAll('.section-1--form__item');

const stepItemAll = document.querySelectorAll('.step-item');
const planList = document.querySelector('.plan-list');
const addOnList = document.querySelector('.add-on-list');

const btnNext = document.querySelector('.btn-next');
const btnBack = document.querySelector('.btn-back');
const btnPlan = document.querySelector('.btn-plan');

const btnChangeHanlder = () => {
  const wrap = document.querySelector('.wrap');

  wrap.addEventListener('click', e => {
    const btnChange = e.target.closest('.btn-change');

    if (!btnChange) return;

    for (const step of stepItemAll) {
      step.classList.remove('step--active');
    }

    for (const section of sectionAll) {
      section.classList.remove('section--active');
    }

    document.querySelector(`.step--2`).classList.add('section--active');

    document
      .querySelector(`.step-item[data-step="2"]`)
      .classList.add('step--active');

    document.querySelector('.final-container').innerHTML = '';
  });
};

btnNext.addEventListener('click', e => {
  for (const formItem of section1FormItemAll) {
    const input = formItem.querySelector('input');

    if (input.value === '') formItem.classList.add('required');
  }

  const requiredAll = document.querySelectorAll('.required');

  if (requiredAll.length === 0) {
    const sectionActive = document.querySelector('.section--active');
    const nextSection = sectionActive.getAttribute('data-next-section');

    for (const step of stepItemAll) {
      step.classList.remove('step--active');
    }

    for (const section of sectionAll) {
      section.classList.remove('section--active');
    }

    if (+nextSection > 1) btnBack.classList.remove('hidden');

    if (+nextSection === 4) {
      btnNext.textContent = 'Confirm';

      const planOp = document.documentElement.getAttribute('data-plan-option');

      const planSelected = document.querySelector('.plan--selected');
      const planPrice = planSelected.querySelector(
        `.plan-content--${planOp} .price`
      );
      const planName = planSelected.getAttribute('data-plan-name');
      const addOnSelectedAll = document.querySelectorAll('.add-on--selected');

      for (const addOn of addOnSelectedAll) {
        const addOnLabel = addOn.getAttribute('data-add-on');
        const price = addOn.querySelector(`.add-on-price--${planOp} .price`);
        data.addOns[addOnLabel].activate = true;
        data.addOns[addOnLabel].price = +price.textContent;
      }

      data['plan'] = planName;
      data['planOp'] = planOp;
      data['planPrice'] = +planPrice.textContent;

      const totalPrice =
        data.planPrice +
        data.addOns.online.price +
        data.addOns.storage.price +
        data.addOns.profile.price;
      const finalContainer = document.querySelector('.final-container');
      const markup = `
        <div class="final">
          <div class="final-top">
            <div>
              <h3 class="final-title">${data.plan}</h3>
              <button class="btn-change" data-goto="2">Change</button>
            </div>
            <p class="final-plan-price">$${data.planPrice}/${
        data.planOp === 'monthly' ? 'mo' : 'yr'
      }</p>
          </div>
          <div class="final-add-on">
            <ul class="final-add-on-list">
            ${
              data.addOns.online.activate === true
                ? `<li>
                    <h4 class="final-add-on-title">${
                      data.addOns.online.title
                    }</h4>
                    <p class="final-add-on-price">+$${
                      data.addOns.online.price
                    }/${data.planOp === 'monthly' ? 'mo' : 'yr'}</p>
                  </li>`
                : ''
            }
            ${
              data.addOns.storage.activate === true
                ? `<li>
                    <h4 class="final-add-on-title">${
                      data.addOns.storage.title
                    }</h4>
                    <p class="final-add-on-price">+$${
                      data.addOns.storage.price
                    }/${data.planOp === 'monthly' ? 'mo' : 'yr'}</p>
                  </li>`
                : ''
            }
            ${
              data.addOns.profile.activate === true
                ? `<li>
                    <h4 class="final-add-on-title">${
                      data.addOns.profile.title
                    }</h4>
                    <p class="final-add-on-price">+$${
                      data.addOns.profile.price
                    }/${data.planOp === 'monthly' ? 'mo' : 'yr'}</p>
                  </li>`
                : ''
            }
            </ul>
          </div>
        </div>
        <div class="final-total">
          <p class="total-text">Total (per ${
            data.planOp === 'monthly' ? 'month' : 'year'
          })</p>
          <p class="total-price">$${totalPrice}/${
        data.planOp === 'monthly' ? 'mo' : 'yr'
      }</p>
        </div>
      `;

      finalContainer.insertAdjacentHTML('beforeend', markup);
    }

    if (+nextSection === 5) {
      btnNext.style.display = 'none';
      btnBack.style.display = 'none';
    }

    document
      .querySelector(`.step--${nextSection}`)
      .classList.add('section--active');

    document
      .querySelector(
        `.step-item[data-step="${+nextSection === 5 ? 4 : nextSection}"]`
      )
      .classList.add('step--active');
  }
});

btnBack.addEventListener('click', () => {
  const sectionActive = document.querySelector('.section--active');
  const nextSection = sectionActive.getAttribute('data-next-section');

  for (const step of stepItemAll) {
    step.classList.remove('step--active');
  }

  for (const section of sectionAll) section.classList.remove('section--active');

  if (+nextSection === 3) btnBack.classList.add('hidden');

  document
    .querySelector(`.step--${nextSection - 2}`)
    .classList.add('section--active');

  document
    .querySelector(`.step-item[data-step="${nextSection - 2}"]`)
    .classList.add('step--active');
});

btnPlan.addEventListener('click', () => {
  let currPlan = document.documentElement.getAttribute('data-plan-option');

  currPlan = currPlan === 'monthly' ? 'yearly' : 'monthly';

  document.querySelector('.plan-monthly').classList.remove('plan--active');
  document.querySelector('.plan-yearly').classList.remove('plan--active');

  document.querySelector(`.plan-${currPlan}`).classList.add('plan--active');
  document.documentElement.setAttribute('data-plan-option', currPlan);
});

section1FormItemAll.forEach(formItem => {
  const input = formItem.querySelector('input');

  input.addEventListener('change', () => {
    formItem.classList.remove('required');
  });
});

planList.addEventListener('click', e => {
  const planItem = e.target.closest('.plan-item');
  const planItemAll = document.querySelectorAll('.plan-item');

  if (!planItem) return;

  for (const item of planItemAll) {
    item.classList.remove('plan--selected');
  }

  planItem.classList.add('plan--selected');
});

addOnList.addEventListener('click', e => {
  const addOnItem = e.target.closest('.add-on--item');

  if (!addOnItem) return;

  addOnItem.classList.toggle('add-on--selected');
});

btnChangeHanlder();
