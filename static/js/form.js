const form = document.getElementById('membership-form')
const submitButton = form.querySelector('button[type=submit]')
const nameInput = form.querySelector('input[name=name]')
const emailInput = form.querySelector('input[name=email]')
const countryInput = form.querySelector('select[name=country]')

const makeStripePayment = async () => {
  // Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
  var PUBLISHABLE_KEY = 'pk_test_WCJLe4VIHyg3wdUQYvMaBa5K00z9hFMGJ2';
  // Replace with the domain you want your users to be redirected back to after payment
  var DOMAIN = location.href.replace(/[^/]*$/, '');

  var stripe = Stripe(PUBLISHABLE_KEY);

  // Handle any errors from Checkout
  var handleResult =  function (result) {
    if (result.error) {
      var displayError = document.getElementById('error-message');
      displayError.textContent = result.error.message;
    }
  };

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    country: countryInput.value,
    membership: 'Individual',
    'opt-in': true
  }

  const zapier_submission = await fetch('https://hooks.zapier.com/hooks/catch/576272/bh4m1pl/', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  const response = await zapier_submission.json()

  return console.log(response)

  // Make the call to Stripe.js to redirect to the checkout page
  // with the sku or plan ID.
  stripe
    .redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: 'price_1JjQ5LAL5YtKKJj5KS3lH6U9', quantity: 1 }],
      successUrl:
        DOMAIN + 'thank-you.html?session_id={CHECKOUT_SESSION_ID}' + `&name=${nameInput.value}`,
      cancelUrl:
        DOMAIN + 'index.html?status=cancelled'
    })
    .then(handleResult);
}


const handleSubmit = (event) => {
  event.preventDefault()
  submitButton.disabled = true

  makeStripePayment()
}

if (form) {
  form.onsubmit = handleSubmit
}
