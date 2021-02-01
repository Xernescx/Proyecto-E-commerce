import React from 'react';
import "./Bar.css";

const Bar = () => {

    return (
        <div className="Bar">
            <div className="Genders">
                <ul class="ks-cboxtags">
                    <li><input type="checkbox" id="checkboxOne" value="Rainbow Dash" /><label for="checkboxOne">Accion</label></li>
                    <li><input type="checkbox" id="checkboxTwo" value="Cotton Candy" /><label for="checkboxTwo">Aventura</label></li>
                    <li><input type="checkbox" id="checkboxThree" value="Rarity" /><label for="checkboxThree">Carreras</label></li>
                    <li><input type="checkbox" id="checkboxFour" value="Moondancer" /><label for="checkboxFour">Deportes</label></li>
                    <li><input type="checkbox" id="checkboxFive" value="Surprise" /><label for="checkboxFive">Estrategia</label></li>
                    <li><input type="checkbox" id="checkboxSix" value="Twilight Sparkle" /><label for="checkboxSix">Indie</label></li>
                    <li><input type="checkbox" id="checkboxSeven" value="Fluttershy" /><label for="checkboxSeven">Multijugador</label></li>
                    <li><input type="checkbox" id="checkboxEight" value="Derpy Hooves" /><label for="checkboxEight">Rol</label></li>
                    <li><input type="checkbox" id="checkboxNine" value="Princess Celestia" /><label for="checkboxNine">Simulador</label></li>
                    <li><input type="checkbox" id="checkboxTen" value="Gusty" /><label for="checkboxTen">FPS</label></li>
                    <li class="ks-selected"><input type="checkbox" id="checkboxEleven" value="Discord" /><label for="checkboxEleven">Lucha</label></li>
                    <li><input type="checkbox" id="checkboxTwelve" value="Clover" /><label for="checkboxTwelve" >RPG</label></li>
                    <li><input type="checkbox" id="checkboxThirteen" value="Baby Moondancer" /><label for="checkboxThirteen">Gestion</label></li>
                </ul>



            </div>
            <div>

            </div>
        </div>
    )


}

export default Bar;