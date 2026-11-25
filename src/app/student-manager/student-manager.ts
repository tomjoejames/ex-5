import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Student {
  id: number;
  name: string;
  rollNo: string;
  department: string;
  marks: number;
}

/**
 * StudentManager component.
 *
 * Demonstrates how an Angular component (TypeScript class) is connected
 * to its HTML template through data binding:
 *  - Interpolation          {{ value }}
 *  - Property binding       [property]="value"
 *  - Event binding          (event)="handler()"
 *  - Two-way binding        [(ngModel)]="field"
 *  - Control flow           @if / @for
 *  - Parent -> child input  heading = input()
 *  - Child -> parent output countChange = output()
 */
@Component({
  selector: 'app-student-manager',
  imports: [FormsModule],
  templateUrl: './student-manager.html',
  styleUrl: './student-manager.css',
})
export class StudentManager {
  /** Value passed in from the parent's HTML: <app-student-manager heading="..."> */
  readonly heading = input('Student Manager');

  /** Event sent to the parent whenever the number of students changes */
  readonly countChange = output<number>();

  readonly departments = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  // Form fields (two-way bound with ngModel)
  name = '';
  rollNo = '';
  department = 'CSE';
  marks: number | null = null;

  readonly search = signal('');
  readonly message = signal('');

  readonly students = signal<Student[]>([
    { id: 1, name: 'Priya Sharma', rollNo: '22CS001', department: 'CSE', marks: 91 },
    { id: 2, name: 'Rahul Verma', rollNo: '22IT014', department: 'IT', marks: 76 },
    { id: 3, name: 'Ananya Iyer', rollNo: '22EC023', department: 'ECE', marks: 58 },
  ]);

  private nextId = 4;

  readonly filtered = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.students();
    return this.students().filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.rollNo.toLowerCase().includes(term) ||
        s.department.toLowerCase().includes(term),
    );
  });

  readonly average = computed(() => {
    const list = this.students();
    if (!list.length) return 0;
    return list.reduce((sum, s) => sum + s.marks, 0) / list.length;
  });

  readonly topper = computed(() =>
    this.students().reduce<Student | null>((best, s) => (!best || s.marks > best.marks ? s : best), null),
  );

  constructor() {
    queueMicrotask(() => this.countChange.emit(this.students().length));
  }

  get isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.rollNo.trim().length > 0 &&
      this.marks !== null &&
      this.marks >= 0 &&
      this.marks <= 100
    );
  }

  grade(marks: number): string {
    if (marks >= 90) return 'O';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 50) return 'B';
    return 'RA';
  }

  addStudent(): void {
    if (!this.isFormValid) return;
    const roll = this.rollNo.trim().toUpperCase();
    if (this.students().some((s) => s.rollNo === roll)) {
      this.flash(`Roll number ${roll} already exists.`);
      return;
    }
    const student: Student = {
      id: this.nextId++,
      name: this.name.trim(),
      rollNo: roll,
      department: this.department,
      marks: Number(this.marks),
    };
    this.students.update((list) => [...list, student]);
    this.countChange.emit(this.students().length);
    this.flash(`${student.name} added successfully.`);
    this.resetForm();
  }

  removeStudent(student: Student): void {
    this.students.update((list) => list.filter((s) => s.id !== student.id));
    this.countChange.emit(this.students().length);
    this.flash(`${student.name} removed.`);
  }

  resetForm(): void {
    this.name = '';
    this.rollNo = '';
    this.department = 'CSE';
    this.marks = null;
  }

  private flash(text: string): void {
    this.message.set(text);
    setTimeout(() => {
      if (this.message() === text) this.message.set('');
    }, 2500);
  }
}
