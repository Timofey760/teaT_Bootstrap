   //Делаем answers глобальной переменной, чтобы иметь доступ к массиву из других функций        
   let answers =
   {
     'test01': ['1', '2', '3', '1', '2', '3', '4', '1', '2', '3'],//ключ:значение
     'test02': ['2', '3', '4'],
     'test03': ['3', '4', '5']
}//объект с ответами
   //Имя для локального хранилища
   let nameLocalStorage = 'localStorageIvanovIvan'
   //Проверка ответов
   function Check(testName) {


       let score = 0;
       //создаем цикл от 1 до длины массива answers. Переменная i-будет счетчиком цикла(1,2,3)
       for (let i = 1; i <= answers[testName].length; i++) {
           //получаем ссылку на объект table с вопросом
           let q = document.getElementById('q' + i);
           //получаем ссылку на объект input с ответом пользователя
           let a = document.getElementById('a' + i);
           //если ответ совпадает с правильным ответом
           if (a.value == answers[testName][i - 1]) {
               //окрашиваем табличку с вопросом в зеленый цвет
               q.style.border = '1px solid green ';
               //увеличиваем количество правильных ответов
               score++;
           }
           else {
               //если ответ не совпадает, то окрашиваем табличку в красный цвет
               q.style.border = '1px solid red';
           }
       }


       //находим элемент с id score и меняем его внутреннее содержимое на score
       document.getElementById('score').innerHTML = score;
   }
   // Сохранение и загрузка




   function Save() {
       if (typeof (Storage) !== "undefined") {
           console.log("Local Storage доступен.");
       } else {


           alert("Local Storage не поддерживается.")
           return;
       }


       //Создаем  объект в котором соберем ответы пользователя и сохраним время сохранения
       let object = {
           userAnswers: [],
           savedTime: null
       };
       //собирает текущие ответы
       for (let i = 0; i < answers.length; i++)
           //получаем ссылку на объект input с ответом пользователя
           object.userAnswers[i] = document.getElementById('a' + (i + 1)).value;


       //в свойство объекта savedTime сохраняем текущее время
       object.savedTime = new Date();
       console.log(object)
       //сохраняем объект в ввиде JSON строки в локальном хранилище браузера
       localStorage.setItem(nameLocalStorage, JSON.stringify(object));
       alert('Данные сохранены')
   }




   function Load() {
       if (typeof (Storage) !== "undefined") {
           console.log("Local Storage доступен.");
       } else {


           alert("Local Storage не поддерживается.")
           return;
       }


       //получение JSON данных из хранилища браузера
       const temp = localStorage.getItem(nameLocalStorage);
       console.log(temp);
       //если в переменной temp null, это означает что в хранилище нет данных с таким ключом
       if (temp != null) {
           //включаем обработку исключительной ситуации
           let object;
           try {
               //преобразование JSON данных в объект
               object = JSON.parse(temp);
               //вывод данных в консоль (для проверки работоспособности программы)
               console.log(object);
           }
           catch {
               console.error('Ошибка парсирования JSON');
               return;
           }
           //заполнение полей веб-старницы данными из массива
           for (let i = 0; i < object.userAnswers.length; i++) {
               document.getElementById('a' + (i + 1)).value = object.userAnswers[i];
           }
       }
       else alert('Нет сохранений с таким именем')
   }
