const socket = io();

const messages = document.querySelector('#messages');
const usrBtn = document.querySelector('#usrBtn');
usrBtn.addEventListener('click', user);

function user(evt) {
	const username = document.querySelector('#username').value;
	socket.emit('join', username);
}

const sendBtn = document.querySelector('#sendBtn');
sendBtn.addEventListener('click', send);

function send(evt) {
	const message = document.querySelector('#message').value;
	socket.emit('message', message);
	document.querySelector('#message').value = '';
}

socket.on('message', (name, date, data) => {
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = date;
	span.className = 'date';
	li.appendChild(span);
	li.appendChild(document.createTextNode(name + ': ' + data));
	messages.appendChild(li);
});

socket.on('exists', (data) => {
	let old = document.querySelector('p');
	if (old) {
		old.parentNode.removeChild(old);
	}
	const p = document.createElement('p');
	p.textContent = data;
	document.querySelector('#user').appendChild(p);
	console.log(data);
});

socket.on('join', (date, data, users) => {
	document.querySelector('#user').style.display = 'none';
	document.querySelector('#chat').style.display = 'inline';
	document.querySelector('#date-header').textContent = (new Date()).toDateString();
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = date;
	span.className = 'date';
	li.appendChild(span);
	span = document.createElement('span');
	span.textContent = data;
	span.id = 'join';
	li.appendChild(span);
	messages.appendChild(li);
	let list = document.querySelector('#users-list');
	if (list) {
		list.parentNode.removeChild(list);
	}
	document.querySelector('#users').style.display = 'block';
	let ul = document.createElement('ul');
	ul.id = "users-list";
	let count = 0;
	for (const u in users) {
		count ++;
		li = document.createElement('li');
		li.textContent = users[u];
		ul.appendChild(li);
	}
	document.querySelector('#users').appendChild(ul);
	document.querySelector('#num').textContent = count;
});


socket.on('disconnect', (date, data, users) => {
	let li = document.createElement('li');
	let span = document.createElement('span');
	span.textContent = date;
	span.className = 'date';
	li.appendChild(span);
	span = document.createElement('span');
	span.textContent = data;
	span.id = 'disconnect';
	li.appendChild(span);
	messages.appendChild(li);
	let list = document.querySelector('#users-list');
	if (list) {
		list.parentNode.removeChild(list);
	}
	document.querySelector('#users').style.display = 'block';
	let ul = document.createElement('ul');
	ul.id = "users-list";
	let count = 0;
	for (const u in users) {
		count ++;
		li = document.createElement('li');
		li.textContent = users[u];
		ul.appendChild(li);
	}
	document.querySelector('#users').appendChild(ul);
	document.querySelector('#num').textContent = count;
});