import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../user.model';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.scss']
})
export class AddEditUserComponent {
  //czemu tu jest input users
  @Input() users: User[] = [];
  @Input() currentUser: User = { id: 0, first_name: '', last_name: '', email: '', avatar: '' };
  @Input() editMode = false;
  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();

  protected readonly faX = faX;

  constructor(private userService: UserService, public modalRef: MdbModalRef<AddEditUserComponent>) {}

  onSubmit(addUserForm: NgForm) {
    if (addUserForm.valid) {
      if (this.editMode) {
        this.userService.updateUser(this.currentUser).subscribe((updatedUser: User) => {
          const index = this.users.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.userUpdated.emit(updatedUser); 
          this.closeAddUserModal({ user: updatedUser });
        });
      } else {
        const newUser: User = {
          id: this.getNextUserId(),
          first_name: addUserForm.value.firstName,
          last_name: addUserForm.value.lastName,
          email: addUserForm.value.email,
          avatar: this.getRandomAvatar()
        };
  
        this.userService.addUser(newUser).subscribe(() => {
          this.users.push(newUser);
          this.userAdded.emit(newUser); 
          this.closeAddUserModal({ user: newUser });
          addUserForm.resetForm();
        });
      }
    }
  }

  closeAddUserModal(data?: any) {
    this.modalRef.close(data);
  }

  private getNextUserId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  }

  private getRandomAvatar(): string {
    const avatarIndex = Math.floor(Math.random() * 12) + 6;
    return `https://reqres.in/img/faces/${avatarIndex}-image.jpg`;
  }
}
