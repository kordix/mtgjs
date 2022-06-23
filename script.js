let runda = 10;
let cardTaken = false;

let player = {
    life: 30,
    mana: 10
}

let enemy = {
    life: 30,
    mana: 1
}


let talia = [
    {
        name: 'skelet',
        damage: 1,
        life: 1,
        cost: 1
    },
    {
        name: 'hedgehog',
        damage: 1,
        life: 3,
        cost: 3
    },
    {
        name: 'prawak',
        damage: 2,
        life: 3,
        cost: 2
    },
    {
        name:'śmieciarz',
        damage:2,
        life:4,
        cost:2
    }
]

talia = _.shuffle(talia);

let cardsTableEnemy = [
    {
        name: 'lewak',
        damage: 1,
        life: 2,
        cost: 2
    },
    {
        name: 'szkieletor',
        damage: 1,
        life: 2,
        cost: 2
    },
    {
        name: 'dupa',
        damage: 1,
        life: 3,
        cost: 3
    },
]

let cardstableplayer = [

];

let cardshand = [

];

let selectedcardtable = {};

function fadein() {
    document.querySelector('#endturnbutton').style.opacity = 1
}

function takeCard() {
    document.querySelector('#talia').classList.remove('pointer');


    if (cardTaken == false) {
        if (talia.length > 0) {
            cardshand.push(talia[0]);
            talia.shift();
            generateCardsHand();
            cardTaken = true;
            fadein();
            increm = 0;
        } else {
            console.log('NIE MA JUŻ KART W TALII');
        }

    }else{
        alert('wziąleś już kartę w tej turze')
    }
}

function layCard(i) {
    let elem = cardshand[i];

    if (player.mana >= elem.cost) {
        cardstableplayer.push(cardshand[i]);
        cardshand.splice(i,1);
        generateCardsTable();
        generateCardsHand();
        player.mana -= elem.cost;
        document.querySelector('#playermana').innerHTML = player.mana;
    }else{
        alert('nie masz wystarczająco many!');
    }
}

function endturn() {
    // document.querySelector('#endturnbutton').style.visibility = 'non e';
    if(document.querySelector('.activecard')){
        document.querySelector('.activecard').classList.remove('activecard');
    }
    var s = document.getElementById('endturnbutton').style;
    s.opacity = 0;
    document.querySelector('#talia').classList.add('pointer');
    cardTaken = false;
    runda++;
    player.mana = runda;
    document.querySelector('#playermana').innerHTML = player.mana;
    selectedcardtable.used = false;
}

function generateCardsHand() {

    document.querySelector('#playerhand').innerHTML = '';
    for (let i = 0; i < cardshand.length; i++) {
        let elem = cardshand[i];

        document.querySelector('#playerhand').innerHTML +=
            `<div style="display:flex" id="cardhand${i}" class="pointer" onclick="layCard(${i})">
                <div class="card" style="display:flex;">
                    <p style="display:flex;justify-content: center;">${elem.name}</p>
                    <p style="height:150px"></p>
                    <div style="display:flex;height:auto;justify-content:space-between">
                        <p style="flex-basis:50%;align-self:flex-start;text-align:left"><span style="color:green">${elem.life}</span>
                            <span style="color:red">${elem.damage}</span>
                        </p>
                        <p style="color:blue">${elem.cost}</p>
                </div>
            </div>`;

    }
}

function generateCardsTable() {

    document.querySelector('#playertable').innerHTML = '';
    for (let i = 0; i < cardstableplayer.length; i++) {
        let elem = cardstableplayer[i];

        document.querySelector('#playertable').innerHTML +=
            `<div style="display:flex" id="cardtableplayer${i}" onclick="selectCardTable(${i})">
                <div class="card pointer ${elem.selected ? 'activecard' : ''}" style="display:flex;">
                    <p style="display:flex;justify-content: center;">${elem.name}</p>
                    <p style="height:150px"></p>
                    <div style="display:flex;height:auto;justify-content:space-between">
                        <p style="flex-basis:50%;align-self:flex-start;text-align:left"><span style="color:green" class="elemlife">${elem.life}</span>
                            <span style="color:red">${elem.damage}</span>
                        </p>
                    <p style="color:blue">${elem.cost}</p>
                </div>
            </div>`;

    }
}

function generateCardsTableEnemy() {

    document.querySelector('#enemytable').innerHTML = '';
    for (let i = 0; i < cardsTableEnemy.length; i++) {
        let elem = cardsTableEnemy[i];

        document.querySelector('#enemytable').innerHTML +=
        `<div style="display:flex" id="cardtableenemy${i}" onclick="attack(${i})">
            <div class="card pointer" style="display:flex;">
                <p style="display:flex;justify-content: center;">${elem.name}</p>
                <p style="height:150px"></p>
                <div style="display:flex;height:auto;justify-content:space-between">
                    <p style="flex-basis:50%;align-self:flex-start;text-align:left"><span style="color:green" class="elemlife">${elem.life}</span>
                        <span style="color:red">${elem.damage}</span>
                    </p>
                <p style="color:blue">${elem.cost}</p>
            </div>
        </div>`;

    }
}

generateCardsTableEnemy();


function selectCardTable(i) {
    let elem = cardstableplayer[i];

    if(!elem.selected){
        elem.selected = true;
    } else{
        elem.selected = false;
    }

    generateCardsTable();

    // if(document.querySelector('.activecard')){
    //     document.querySelector('.activecard').classList.remove('activecard');
    // }

    // if (Object.keys(selectedcardtable).length === 0) {
    //     selectedcardtable = cardstableplayer[i];
    //     selectedcardtable.indeks = i;
    // } else {
        //selectedcardtable = {}
    // }
    // let element = '#cardtableplayer' + i;

    // document.querySelector(element).getElementsByClassName('card')[0].classList.add('activecard');

}


function attack(i) {
    if(selectedcardtable.used){
        alert('ta karta już atakowała w tej rundzie');
        if(document.querySelector('.activecard')){
            document.querySelector('.activecard').classList.remove('activecard');
        }
        return;
    }
    
    let elem = cardsTableEnemy[i];
    elem.life -= selectedcardtable.damage;
    console.log(selectedcardtable);
    selectedcardtable.life -= elem.damage;
    selectedcardtable.used = true

    let element = '#cardtableenemy' + i;

 //   document.querySelector(element).getElementsByClassName('elemlife')[0].innerHTML = elem.life;
//  document.querySelector('#cardtableplayer0').getElementsByClassName('elemlife')[0].innerHTML = selectedcardtable.life;

    if (selectedcardtable.life <= 0) {
     //   document.querySelector('#cardtableplayer0').remove();
        cardstableplayer.splice(selectedcardtable.indeks,1);
    } else {
     //   if (document.querySelector('#cardtableplayer0').getElementsByClassName('activecard')[0]) {
         //   document.querySelector('#cardtableplayer0').getElementsByClassName('activecard')[0].classList.remove('activecard');
    //    }
    }

    if (elem.life <= 0) {
        //    document.querySelector(element).remove();
        cardsTableEnemy.splice(i, 1);
        generateCardsTableEnemy();
    }

    generateCardsTable();
    

    //selectedcardtable = {};





}