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

    function createTodoItem(name){
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('todo__item', 'item');
        item.textContent = name;

        buttonGroup.classList.add('btn-wrapper');
        doneButton.classList.add('done-btn', 'btn');
        doneButton.textContent = "Готово";
        deleteButton.classList.add('remove-btn', 'btn');
        deleteButton.textContent = "Удалить";

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return{
            item,
            doneButton,
            deleteButton
        };
    }

    document.addEventListener('DOMContentLoaded', function(){
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle("Список дел");
        let todoAppForm = createTodoItemForm()
        let todoAppList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);

        todoAppForm.form.addEventListener('submit', function(e){
            e.preventDefault();

            if (!todoAppForm.input.value){
                return;
            }  
            let todoItem = createTodoItem(todoAppForm.input.value);
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('--done');
                todoItem.doneButton.classList.toggle('--yellow');
                if (todoItem.doneButton.textContent != "Не готово"){
                    todoItem.doneButton.textContent = "Не готово";
                }
                else{
                    todoItem.doneButton.textContent = "Готово";
                }
                                                
            });

            todoItem.deleteButton.addEventListener('click',function(){
                if (confirm('Вы уверены?')){
                    todoItem.item.remove();
                }
            });
            todoAppForm.input.value = '';
            todoAppList.append(todoItem.item);
        })
    });
})();