const form = document.getElementById('membership-form')
const submitButton = form.querySelector('button[type=submit]')

const makeStripePayment = () => {
  // Replace with your own publishable key: https://dashboard.stripe.com/test/apikeys
  var PUBLISHABLE_KEY = 'pk_test_WCJLe4VIHyg3wdUQYvMaBa5K00z9hFMGJ2';
  // Replace with the domain you want your users to be redirected back to after payment
  var DOMAIN = location.href.replace(/[^/]*$/, '');

  var stripe = Stripe(PUBLISHABLE_KEY);

  // Handle any errors from Checkout
  var handleResult = function (result) {
    if (result.error) {
      var displayError = document.getElementById('error-message');
      displayError.textContent = result.error.message;
    }
  };

    // Make the call to Stripe.js to redirect to the checkout page
    // with the sku or plan ID.
    stripe
      .redirectToCheckout({
        mode: 'subscription',
        lineItems: [{ price: 'price_1JjQ5LAL5YtKKJj5KS3lH6U9', quantity: 1 }],
        successUrl:
          DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl:
          DOMAIN + 'canceled.html?session_id={CHECKOUT_SESSION_ID}',
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
