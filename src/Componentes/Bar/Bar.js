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
                        <li><input type="checkbox" name="genders" id="checkboxOne"          value="Accion" />           <label for="checkboxOne">           Accion      </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxTwo"          value="Aventura" />         <label for="checkboxTwo">           Aventura    </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxThree"        value="Arcade" />           <label for="checkboxThree">         Arcade      </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxFour"         value="Carreras" />         <label for="checkboxFour">          Carreras    </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxFive"         value="Cooperativo" />      <label for="checkboxFive">          Cooperativo </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxSix"          value="Deportes" />         <label for="checkboxSix">           Deportes    </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxSeven"        value="DLC" />              <label for="checkboxSeven">         DLC         </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxEight"        value="Estrategia" />       <label for="checkboxEight">         Estrategia  </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxNine"         value="FPS" />              <label for="checkboxNine">          FPS         </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxTen"          value="Gestion" />          <label for="checkboxTen">           Gestion     </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxEleven"       value="Indie" />            <label for="checkboxEleven">        Indie       </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxTwelve"       value="Lucha" />            <label for="checkboxTwelve">        Lucha       </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxThirteen"     value="Multijugador"/>      <label for="checkboxThirteen">      Multijugador</label></li>
                        <li><input type="checkbox" name="genders" id="checkboxFourTeen"     value="RPG" />              <label for="checkboxFourTeen">      RPG         </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxFifteen"      value="Rol" />              <label for="checkboxFifteen">       Rol         </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxSixteen"      value="Sigilor" />          <label for="checkboxSixteen">       Sigilo      </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxSevenTeen"   value="Simulador" />        <label for="checkboxSevenTeen">     Simulador   </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxEightTeen"    value="Terror" />           <label for="checkboxEightTeen">     Terror      </label></li>
                        <li><input type="checkbox" name="genders" id="checkboxNineTeen"     value="Un jugador " />       <label for="checkboxNineTeen">     Un jugador  </label></li>
                    </ul>
                </div>
            </div>
            <div className="Plataform">
                <div>
                    <ul>
                        <li><input type="checkbox" name="plataforms" id="imgOne" value="steam" /> <label for="imgOne">        <img src={Steam} alt="steam" /></label></li>
                        <li><input type="checkbox" name="plataforms" id="imgTwo" value="epic" />  <label for="imgTwo">        <img src={Epic} alt="epic games" />   </label></li>
                        <li><input type="checkbox" name="plataforms" id="imgTrhee" value="origin" /> <label for="imgTrhee">   <img src={Orinin} for="imgTrhee" alt="origin" /> </label> </li>
                    </ul>
                </div>
                <div>
                <ul>
                        <li><input type="checkbox" name="plataforms" id="imgFor"  value="steam" /> <label  for="imgFor" >   <img src={Battle} alt="battle" />  </label></li>
                        <li><input type="checkbox" name="plataforms" id="imgFive" value="epic" />  <label  for="imgFive">   <img src={Gog}     alt="gog" />  </label></li>
                        <li><input type="checkbox" name="plataforms" id="imgSix"  value="origin" /> <label for="imgSix" >   <img src={Uplay}  alt="uplay" />        </label> </li>
                    </ul>
                </div>
            </div>
        </div>
    )


}

export default Bar;