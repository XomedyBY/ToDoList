(function(){
    // Создаю и возвращаю заголовок приложения
    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.classList.add('title');
        appTitle.innerHTML = title;
        return appTitle;
    }
    // Создаю и возвращаю форму для создания дела
    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let button = document.createElement('button');

        form.classList.add('form');
        input.classList.add('form__input', 'input');
        button.classList.add('form__btn', 'btn');

        input.placeholder = "Введите название нового дела";
        button.textContent = "Добавить дело";

        form.append(input);
        form.append(button);
        
        return{
            form,
            input,
            button
        };
    }
    // Создаю и возвращаю список элементов
    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list');
        return list;
    }

    document.addEventListener('DOMContentLoaded', function(){
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle("Список дел");
        let todoAppForm = createTodoItemForm()
        let todoAppList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);
    });
})();