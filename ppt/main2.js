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

function check(num)
{
    
}


$(document).ready(function()
{
    hideAll();

    $(".btn").click(function()
    {
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
            
            if(num == 1)
            {
                $()
            }
            else if(num == 2)
            {

            }
            else if(num == 3)
            {

            }
        }
        else if(op == 1)
        {
            alert();
        }
        else if(op == 2)
        {
            alert();
        }
        
    });
})