"use strict";
var reminders = [];
var form = document.getElementById('reminder-form');
var list = document.getElementById('reminder-list');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var titleInput = document.getElementById('title');
    var title = titleInput.value.trim();
    if (!title)
        return;
    var newReminder = {
        id: Date.now(),
        title: title,
        createdAt: new Date()
    };
    reminders.push(newReminder);
    renderReminders();
    form.reset();
});
function renderReminders() {
    list.innerHTML = '';
    reminders.forEach(function (reminder) {
        var li = document.createElement('li');
        li.innerHTML = "\n      <strong>".concat(reminder.title, "</strong><br/>\n      Criado em: ").concat(reminder.createdAt.toLocaleString(), "<br/>\n      <button onclick=\"deleteReminder(").concat(reminder.id, ")\">Excluir</button>\n    ");
        list.appendChild(li);
    });
}
// @ts-ignore
window.deleteReminder = function (id) {
    reminders = reminders.filter(function (r) { return r.id !== id; });
    renderReminders();
};
