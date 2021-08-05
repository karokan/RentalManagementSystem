import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { TenantService } from '../tenant.service';
import { Notification } from './tenant-notification.model';

@Component({
  selector: 'app-tenant-notification',
  templateUrl: './tenant-notification.component.html',
  styleUrls: ['./tenant-notification.component.css'],
})
export class TenantNotificationComponent implements OnInit, OnDestroy {
  isActive = false;
  isLoading = false;
  enteredContent = '';
  enteredTitle = '';
  notifications: Notification[] = [];
  private notificationSub: Subscription;

  constructor(public tenantService: TenantService) {}

  onAddNotification(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.tenantService.addNotification(form.value.title, form.value.content);
    form.resetForm();
  }

  onDelete(notificationId: string) {
    this.tenantService.deleteNotification(notificationId);
  }

  ngOnInit(): void {
    // this.tenantService.getNotification();
    this.tenantService.getUserNotification();
    this.notificationSub = this.tenantService
      .getNotificationUpdateListener()
      .subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }
}
