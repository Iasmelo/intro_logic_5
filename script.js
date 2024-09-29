let userName;
let userPassword = "3589"; // Senha padrão
let balance = 1000; // Saldo inicial
let transactions = [];

function login() {
    userName = document.getElementById('userName').value;
    const passwordInput = document.getElementById('userPassword').value;

    // Validação do nome do usuário (apenas letras)
    if (!/^[A-Za-z\s]+$/.test(userName)) {
        displayMessage("O nome de usuário deve conter apenas letras.");
        return;
    }

    // Validação da senha (apenas números)
    if (!/^\d+$/.test(passwordInput)) {
        displayMessage("A senha deve conter apenas números.");
        return;
    }

    if (passwordInput === userPassword) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('menuSection').style.display = 'block';
        document.getElementById('greeting').innerText = `Olá ${userName}, é um prazer ter você por aqui!`;
        showMenu();
    } else {
        displayMessage("Senha incorreta. Tente novamente.");
    }
}

function showMenu() {
    const menuOptions = `
        <button class="menu-option" onclick="menuAction(1)">Saldo</button>
        <button class="menu-option" onclick="menuAction(2)">Extrato</button>
        <button class="menu-option" onclick="menuAction(3)">Saque</button>
        <button class="menu-option" onclick="menuAction(4)">Depósito</button>
        <button class="menu-option" onclick="menuAction(5)">Transferência</button>
        <button class="menu-option" onclick="menuAction(6)">Sair</button>
    `;
    document.getElementById('menu').innerHTML = menuOptions;
}

function menuAction(option) {
    document.getElementById('output').innerText = ''; // Limpar saída anterior
    document.getElementById('operationPassword').value = ''; // Limpar senha anterior
    document.getElementById('passwordSection').style.display = 'block'; // Mostrar campo de senha

    let actionFunction;
    switch (option) {
        case 1: // Saldo
            actionFunction = () => {
                const output = `Seu saldo é: R$ ${balance.toFixed(2)}`;
                displayMessage(output);
            };
            break;
        case 2: // Extrato
            actionFunction = () => {
                const output = transactions.length > 0 
                    ? `Extrato:\n${transactions.join('\n')}` 
                    : "Nenhuma transação realizada.";
                displayMessage(output);
            };
            break;
        case 3: // Saque
            actionFunction = () => {
                const amount = parseFloat(prompt("Digite o valor do saque:"));
                if (amount > 0 && amount <= balance) {
                    balance -= amount;
                    transactions.push(`Saque: R$ ${amount.toFixed(2)}`);
                    displayMessage(`Saque de R$ ${amount.toFixed(2)} realizado.`);
                } else {
                    displayMessage("Operação não autorizada.");
                }
            };
            break;
        case 4: // Depósito
            actionFunction = () => {
                const amount = parseFloat(prompt("Digite o valor do depósito:"));
                if (amount > 0) {
                    balance += amount;
                    transactions.push(`Depósito: R$ ${amount.toFixed(2)}`);
                    displayMessage(`Depósito de R$ ${amount.toFixed(2)} realizado.`);
                } else {
                    displayMessage("Operação não autorizada.");
                }
            };
            break;
        case 5: // Transferência
            actionFunction = () => {
                const accountNumber = prompt("Digite o número da conta (apenas números):");
                const amount = parseFloat(prompt("Digite o valor da transferência:"));
                if (!isNaN(accountNumber) && amount > 0 && amount <= balance) {
                    balance -= amount;
                    transactions.push(`Transferência de R$ ${amount.toFixed(2)} para a conta ${accountNumber}`);
                    displayMessage(`Transferência de R$ ${amount.toFixed(2)} realizada.`);
                } else {
                    displayMessage("Operação não autorizada.");
                }
            };
            break;
        case 6: // Sair
            displayMessage(`${userName}, foi um prazer ter você por aqui!`);
            document.getElementById('menuSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('userName').value = '';
            document.getElementById('userPassword').value = '';
            return;
        default:
            displayMessage("Opção inválida.");
            return;
    }

    // Armazenar a função de ação na seção de senha para ser chamada após validação
    document.getElementById('passwordSection').setAttribute('data-action', actionFunction.toString());
}

function validatePassword() {
    const inputPassword = document.getElementById('operationPassword').value;
    const actionFunction = document.getElementById('passwordSection').getAttribute('data-action');

    if (inputPassword === userPassword) {
        eval(actionFunction)(); // Executar a função da ação
        document.getElementById('passwordSection').style.display = 'none'; // Ocultar campo de senha
    } else {
        displayMessage("Senha incorreta. Tente novamente.");
    }
}

function displayMessage(message) {
    document.getElementById('output').innerText = message;
}


