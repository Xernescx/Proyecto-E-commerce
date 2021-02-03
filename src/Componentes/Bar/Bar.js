import React from 'react';
import "./Bar.css";
import Steam from './IconLogo/steam.png';
import Epic from './IconLogo/epic.png'
import Battle from './IconLogo/battle.png'
import Gog from './IconLogo/gog.png'
import Uplay from './IconLogo/uplay.png'
import Orinin from './IconLogo/origin.png'

const Bar = () => {


        
    return (
        <div className="Bar " >
            
            <div className="Genders">
                <p>Generos</p>
                <div className="Genders scrollbar" id="barScroll">
                    <ul className="ks-cboxtags">
                        <li><input type="checkbox" id="checkboxOne" value="Accion" />       <label for="checkboxOne">       Accion      </label></li>
                        <li><input type="checkbox" id="checkboxTwo" value="Aventura" />     <label for="checkboxTwo">       Aventura    </label></li>
                        <li><input type="checkbox" id="checkboxThree" value="Arcade" />        <label for="checkboxThree">     Arcade      </label></li>
                        <li><input type="checkbox" id="checkboxFour" value="Carreras" />      <label for="checkboxFour">      Carreras    </label></li>
                        <li><input type="checkbox" id="checkboxFive" value="Cooperativo" />   <label for="checkboxFive">      Cooperativo </label></li>
                        <li><input type="checkbox" id="checkboxSix" value="Deportes" />     <label for="checkboxSix">       Deportes    </label></li>
                        <li><input type="checkbox" id="checkboxSeven" value="Estrategia" />   <label for="checkboxSeven">     Estrategia  </label></li>
                        <li><input type="checkbox" id="checkboxEight" value="FPS" />          <label for="checkboxEight">     FPS         </label></li>
                        <li><input type="checkbox" id="checkboxNine" value="Gestion" />      <label for="checkboxNine">      Gestion     </label></li>
                        <li><input type="checkbox" id="checkboxTen" value="Indie" />        <label for="checkboxTen">       Indie       </label></li>
                        <li><input type="checkbox" id="checkboxEleven" value="Lucha" />        <label for="checkboxEleven">    Lucha       </label></li>
                        <li><input type="checkbox" id="checkboxTwelve" value="Multijugador" /> <label for="checkboxTwelve">    Multijugador</label></li>
                        <li><input type="checkbox" id="checkboxThirteen" value="RPG" />          <label for="checkboxThirteen">  RPG         </label></li>
                        <li><input type="checkbox" id="checkboxFourTeen" value="Rol" />          <label for="checkboxFourTeen">  Rol         </label></li>
                        <li><input type="checkbox" id="checkboxFifteen" value="Sigilor" />      <label for="checkboxFifteen">   Sigilo      </label></li>
                        <li><input type="checkbox" id="checkboxSixteen" value="Simulador" />    <label for="checkboxSixteen">   Simulador   </label></li>
                        <li><input type="checkbox" id="checkboxSevenTeen" value="Terror" />       <label for="checkboxSevenTeen"> Terror      </label></li>
                        
                    </ul>
                </div>
            </div>
            <div className="Plataform">
                <img src={Steam} alt="steam" />
                <img src={Epic} alt="epic games" />
                <img src={Battle} alt="battle" />
                <img src={Gog} alt="gog" />
                <img src={Orinin} alt="origin" />
                <img src={Uplay} alt="uplay" />
            </div>
        </div>
    )


}

export default Bar;