import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { environment } from 'src/environments/environment.production';
import { ToastService } from 'src/app/services/toast.service';

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
  @Input() message: string = '';
  @Input() subject: string = '';
  @Input() emailFrom: string = '';
  @Output() openContactChange = new EventEmitter<boolean>();
  public contactForm: FormGroup;

  constructor(private fb: FormBuilder, private mailService: MailService, private notificationService: ToastService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [this.message, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
      this.contactForm.get('message')?.setValue(this.message);
    }
  }

  onOpenContact() {
    this.openContactChange.emit(!this.openContact);
  }

  async submitEmail() {
    // -- set formData values
    let formData: FormData = new FormData();
    formData.append('name', this.contactForm.get('name')?.value);
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('body', this.contactForm.get('message')?.value);
    // -- email customization
    formData.append('access_key', environment.FORM_ACCESS_KEY);
    formData.append('subject', this.subject);
    formData.append('from_name', this.emailFrom);

    try {
      const res = await this.mailService.sendEmail(formData);
      if (!res.ok) {
        this.notificationService.show('Something went wrong', 'error');
        throw new Error();
      } else {
        this.notificationService.show('Inquery sent', 'success');
      }
    } catch {
      this.notificationService.show('Something went wrong', 'error');
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitEmail();
    }
    this.onOpenContact();
  }

}
