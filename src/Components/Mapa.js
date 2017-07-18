import React, { Component } from 'react';

class Mapa extends Component{
    render(){
        return(
            <div id="mapa">
                <div className="ramal" id="eze">
                    <div className="cuadrado circulo" id="EZEIZA"></div>
                    <div className="cuadrado circulo" id="JAGUEL"></div>
                    <div className="cuadrado circulo" id="GRANDE"></div>
                    <div className="cuadrado circulo" id="GUILLON"></div>
                    <div className="cuadrado circulo" id="LLAVALLOL"></div>
                    <div className="cuadrado circulo" id="TURDERA"></div>
                </div>
                <div className="ramal" id="adro">
                    <div className="cuadrado circulo" id="KORN"></div>
                    <div className="cuadrado circulo" id="GUERNICA"></div>
                    <div className="cuadrado circulo" id="GLEW"></div>
                    <div className="cuadrado circulo" id="LONGCHAMPS"></div>
                    <div className="cuadrado circulo" id="BURZACO"></div>
                    <div className="cuadrado circulo" id="ADROGUE"></div>
                </div>
                <div className="ramal" id="consti">
                    <div className="cuadrado circulo" id="TEMPERLEY"></div>
                    <div className="cuadrado circulo" id="LOMAS"></div>
                    <div className="cuadrado circulo" id="BANFIELD"></div>
                    <div className="cuadrado circulo" id="ESCALADA"></div>
                    <div className="cuadrado circulo" id="LANUS"></div>
                    <div className="cuadrado circulo" id="GERLI"></div>
                    <div className="cuadrado circulo" id="AVELLANEDA"></div>
                    <div className="cuadrado circulo" id="YRIGOYEN"></div>
                    <div className="cuadrado circulo" id="CONSTITUCION"></div>
                </div>
            </div>
        );
    }
}

export default Mapa;
