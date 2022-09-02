import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Output() increament=new EventEmitter<void>();
  @Output() decrement=new EventEmitter<void>();
  count= 0.001;



  constructor() { }

  ngOnInit(): void {

  }
  
  incrementCounter() {
    this.increament.emit()
  }

  decrementCounter() {
  this.decrement.emit()
  }

}
