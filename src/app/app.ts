import { Component, signal } from '@angular/core';
import { StudentManager } from './student-manager/student-manager';

@Component({
  selector: 'app-root',
  imports: [StudentManager],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angular Component Demo');
  protected readonly studentCount = signal(0);

  /** Receives the (countChange) event emitted by the child component */
  onCountChange(count: number): void {
    this.studentCount.set(count);
  }
}
