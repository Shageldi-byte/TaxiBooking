ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [37.958310,58.335502],
            zoom: 15,
            controls: ['routePanelControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),

         // Создаём макет содержимого.
         MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: red; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        yellowCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'islands#yellowIcon'
        }),
        blueCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'islands#blueIcon'
        }),
        yellowCoords = [[37.959380,58.335502], [37.950330,58.335512],
        [37.950406,58.370977], [37.952042,58.397946],
        [37.946572,58.419539], [37.940623,58.449068],
        [37.924224,58.439152], [7.889918,58.404612],
        [37.909301,58.445117], [37.886158,58.404278],
        [37.895840,58.431618], [37.887221,58.399729],
        [37.890795,58.411016], [37.887470,58.394411],
         [37.884040,58.394025],

         [37.953558,58.335915],
         [37.952118,58.341584],
         [37.948745,58.347070],
         [37.953660,58.347052]],
        blueCoords = [[37.958350,58.335502], [37.958360,58.335502]];


        for (var i = 0, l = yellowCoords.length; i < l; i++) {
            var randomnumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            yellowCollection.add(new ymaps.Placemark(yellowCoords[i],{
                hintContent: 'Doly maglumatyny görmek üçin üstüne bas',
                balloonContent: 'Bu ulagyň belgisi: 3540, Telefon belgisi: +99361234567',
                iconContent: "Ulagdaky adam sany: "+randomnumber
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: 'images/tb_car1.png',
                // Размеры метки.
                iconImageSize: [24, 48],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            }));
        }
        // for (var i = 0, l = blueCoords.length; i < l; i++) {
        //     blueCollection.add(new ymaps.Placemark(blueCoords[i]));
        // }
    
        myMap.geoObjects.add(yellowCollection);
    
        // Через коллекции можно подписываться на события дочерних элементов.
        yellowCollection.events.add('click', function () { alert('Bu ulagyň belgisi: 3540, Telefon belgisi: +99361234567') });
        // blueCollection.events.add('click', function () { alert('Кликнули по синей метке') });
    
        // Через коллекции можно задавать опции дочерним элементам.
        blueCollection.options.set('preset', 'islands#blueDotIcon');

       

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Bu siziň ýerleşýän ýeriňiz',
            balloonContent: 'Ýerleşýän ýeriňiz'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/user_arrow.png',
            // Размеры метки.
            iconImageSize: [30, 30],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/tb_car1.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);

    var control = myMap.controls.get('routePanelControl');

    // Зададим состояние панели для построения машрутов.
    control.routePanel.state.set({
        // Тип маршрутизации.
        type: 'masstransit',
        // Выключим возможность задавать пункт отправления в поле ввода.
        fromEnabled: false,
        // Адрес или координаты пункта отправления.
        from: '37.958310,58.335502',
        // Включим возможность задавать пункт назначения в поле ввода.
        toEnabled: true
        // Адрес или координаты пункта назначения.
        //to: 'Петербург'
    });

    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
        // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
        allowSwitch: false,
        // Включим определение адреса по координатам клика.
        // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
        reverseGeocoding: true,
        // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
        types: { masstransit: true, pedestrian: true, taxi: true }
    });

    // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
    var switchPointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами", title: "Поменять точки местами"},
        options: {selectOnClick: false, maxWidth: 160}
    });
    // Объявляем обработчик для кнопки.
    switchPointsButton.events.add('click', function () {
        // Меняет местами начальную и конечную точки маршрута.
        control.routePanel.switchPoints();
    });
    myMap.controls.add(switchPointsButton);

    
});