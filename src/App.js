import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import toDataURL from './helpers/toDataURL';

class App extends Component {
  constructor () {
    super();
    this.context = window.Snap("#table");
    console.log(this.context);
   // this.resetTable();
    var imageHtml = document.getElementById('image');
    this.addElement = this.addElement.bind(this);
    this.removeElements = this.removeElements.bind(this);
    this.randomizeElements = this.randomizeElements.bind(this);

    this.canvasWidth = 1200;
    this.canvasHeight = 610;
    this.elements = {
      fl:[],
      fr:[]
    };

    
  }
  componentDidMount () {
    this.context = window.Snap("#table");
    console.log(this.context);
     this.resetTable();
     toDataURL("https://www.apple.com/news/images/og.png?201703271054")
    .then(e=>{
     
       this.context.image(e).attr({
     opacity:0.2
   });
     this.renderImage();
    });
  }

  renderImage () {
    this.imageref.src = this.context.toDataURL();
  }

  resetTable() {
    var cornerColor = '#dbbc8e';
    var tableColor = '#ebc990';
    var corner = 60,
    canvasWidth = 1200,
    canvasHeight = 610;
    var tableBackground = this.context.rect(0, 0, canvasWidth, canvasHeight);
    tableBackground.attr({
      fill: tableColor
    });

    var cornertl = this.context.rect(0, 0, corner, corner);
    var cornertr = this.context.rect(0, canvasHeight-corner, corner, corner);
    var cornerbl = this.context.rect(canvasWidth-corner, 0, corner, corner);
    var cornerbr = this.context.rect(canvasWidth-corner,  canvasHeight-corner, corner, corner);
    var corners = this.context.group(cornertl, cornertr, cornerbl, cornerbr);
    corners.attr({
      fill:cornerColor
    });

  }
  addElement () {
    var el = this.context.rect(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight, 12, 12).attr({
      fill:"#ff0000"
    });
    this.elements.fr.push(el);
    this.renderImage();
  }
  removeElements () {
    this.elements.fr.forEach(function(e){
      e.remove();
    });
    this.renderImage();
  }
  randomizeElements () {
    this.elements.fr.forEach(function(e){
      e.attr({
        x: 0
      });
    });
    this.renderImage();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <svg id="table" width="1200" height="610"></svg>
          <img ref={e=>{this.imageref=e}} src={logo}  alt="logo" />
        </div>
        <div>
          <button onClick={this.addElement}>add Element</button>
          <button onClick={this.removeElements}>remove Elements</button>
          <button onClick={this.randomizeElements}>randomize Elements</button>
        </div>
      </div>
    );
  }
}

export default App;
