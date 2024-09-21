import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
        <section class="h-dvh w-full fixed top-0 left-0 bg-cvg-475 z-[9999] backdrop-blur-sm texture-2 rounded-sm" *ngIf="openContact">

          <div class="flex justify-center align-center flex-col items-center w-full h-full">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="min-w-[20vw] min-h-[20vh] flex flex-col justify-center align-center bg-cvg-400 p-6 gap-4">
              <h2 class="text-center text-white underline underline-offset-8">Get in touch</h2>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" class="input" formControlName="name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="input" formControlName="email">
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" formControlName="message" rows="4" cols="50"></textarea>
              </div>
              <div class="flex gap-4 w-full justify-end pt-6">
                <button type="submit" class="btn !bg-cvg-accent2 hover:!bg-cvg-100" [disabled]="contactForm.invalid">Send</button>
                <button type="button" class="btn !bg-cvg-200 hover:!bg-cvg-100" (click)="onOpenContact()">Close</button>
              </div>
            </form>

          </div>
        </section>
            `,
  styles: ``
})
export class ContactModalComponent {
  @Input() openContact: boolean = false;
  @Output() openContactChange = new EventEmitter<boolean>();
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onOpenContact(){
    this.openContactChange.emit(!this.openContact);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;
      console.log('Form Submitted!', formValues);
    }
  }

}
