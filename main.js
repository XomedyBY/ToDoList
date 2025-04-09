(function(){
    // Преобразуем данные в JSON 
    function dataToJson(data){
        return JSON.stringify(data);
    }

    // Преобразует JSON строку в данные
    function jsonToData(data){
        return JSON.parse(data);
    }

    // Получаю данные из LocalStorage
    function getData(key){
        return localStorage.getItem(key);
    }

    // Сохраняем данные в LocalStorage под указанным ключом
    function setData(key, data){
        localStorage.setItem(key, data);
    }


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
        doneButton.addEventListener('click', function(){
            item.classList.toggle('--done');
            doneButton.classList.toggle('--yellow');
            if (doneButton.textContent != "Не готово"){
                doneButton.textContent = "Не готово";
            }
            else{
                doneButton.textContent = "Готово";
            }
                                            
        });

        deleteButton.classList.add('remove-btn', 'btn');
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener('click',function(){
            if (confirm('Вы уверены?')){
                item.remove();
            }
        });

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

        const key = 'todoList';
        let list = jsonToData(getData(key));
        if (list){
            for (let i = 0; i < list.length; i++){
                let todoItem = createTodoItem(list[i]);
                todoAppList.append(todoItem.item);
            }
        }
        else{
            list = [];
        }

        container.append(todoAppTitle);
        container.append(todoAppForm.form);
        container.append(todoAppList);

        todoAppForm.form.addEventListener('submit', function(e){
            e.preventDefault();

            if (!todoAppForm.input.value){
                return;
            }
            let todoItem = createTodoItem(todoAppForm.input.value);
            list.push(todoAppForm.input.value);
            setData(key, dataToJson(list));
            ////////////////////////////////////////////////////////////
            todoAppForm.input.value = '';
            todoAppList.append(todoItem.item);
        });

        setData(key, dataToJson(list));
    });
})();