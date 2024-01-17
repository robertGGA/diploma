import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rg-default-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultDialogComponent {

}
