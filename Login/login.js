  const emailInput = document.getElementById('email');
    const continueBtn = document.querySelector('button');

    emailInput.addEventListener('input', () => {
      continueBtn.disabled = !emailInput.value.includes('@');
    });