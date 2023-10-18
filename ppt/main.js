var id;
var op;

function hideAll()
{
    $(".j1").each(function()
    {
        $(this).hide();
    });

    $(".j2").each(function()
    {
        $(this).hide();
    });   
}

function checkWinner(numJ1, numJ2)
{
    console.clear();

    if(numJ1 == 1) //j1 saca piedra
    {
        if(numJ2 == 2) //j2 papel -> pierde j1
        {
            console.log("Jugador 2 gana!\nJugador 1 pierde");
        }
        else if(numJ2 == 3)   //j2 tijera -> gana j1
        {
            console.log("Jugador 1 gana!\nJugador 2 pierde");
        }
        else
        {
            console.log("Empate");
        }
    }
    else if(numJ1 == 2) //j1 saca papel
    {
        if(numJ2 == 1) //j2 piedra -> gana j1
        {
            console.log("Jugador 1 gana!\nJugador 2 pierde");
        }
        else if(numJ2 == 3)   //j2 tijera -> pierde j1
        {
            console.log("Jugador 2 gana!\nJugador 1 pierde");
        }
        else
        {
            console.log("Empate");
        }
    }
    else if(numJ1 == 3) //j1 saca tijera
    {
        if(numJ2 == 1) //j2 piedra -> pierde j1
        {
            console.log("Jugador 2 gana!\nJugador 1 pierde");
        }
        else if(numJ2 == 2)   //j2 papel -> gana j1
        {
            console.log("Jugador 1 gana!\nJugador 2 pierde");
        }
        else
        {
            console.log("Empate");
        }
    }
}

function displayHandA(num)
{
    id = 0;

    $(".j1").each(function()
    {
        $(this).hide();
    });

    $(".j1").each(function()
    {
        id = $(this).attr('id');

        if(id == num)
        {
            $(this).show();
        }
    });
}

function displayHandB(num)
{
    id = 0;
    let n = parseInt(num, 10);
    n+=3;

    $(".j2").each(function()
    {
        $(this).hide();
    });
    
    $(".j2").each(function()
    {
        id = $(this).attr('id');

        if(id == n)
        {
            $(this).show();
        }
    });
}
    
$(document).ready(function()
{
    hideAll();

    $(".btn").click(function()
    {
        hideAll();

        if($("#jugadores").val() == 0)
        {
            op = 0;
        }
        else if($("#jugadores").val() == 1)
        {
            op = 1;
        }
        else if($("#jugadores").val() == 2)
        {
            op = 2;
        }
    });

    $(".btn2").click(function()
    {

        if(op == 0)
        {
            let randJ1 = Math.floor((Math.random() * 3) + 1);
            let randJ2 = Math.floor((Math.random() * 3) + 1);
            
            displayHandA(randJ1);
            displayHandB(randJ2);
            checkWinner(randJ1, randJ2);
        }
        else if(op == 1)
        {
            let randJ1 = prompt("Elige tu tirada:\n   1.Piedra\n   2.Papel\n   3.Tijera");
            let randJ2 = Math.floor((Math.random() * 3) + 1);

            displayHandA(randJ1);
            displayHandB(randJ2);
            checkWinner(randJ1, randJ2);
        }
        else if(op == 2)
        {
            let randJ1 = prompt("Elige tu tirada:\n   1.Piedra\n   2.Papel\n   3.Tijera");
            let randJ2 = prompt("Elige tu tirada:\n   1.Piedra\n   2.Papel\n   3.Tijera");

            console.log(randJ1);
            console.log(randJ2);

            displayHandA(parseInt(randJ1, 10));
            displayHandB(parseInt(randJ2, 10));
            checkWinner(randJ1, randJ2);
        }
        
    });
})