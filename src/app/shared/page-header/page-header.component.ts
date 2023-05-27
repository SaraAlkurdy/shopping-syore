import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() buttonTxt: string = '';
  @Output() buttonSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.buttonSubmit.emit();
  }
}
