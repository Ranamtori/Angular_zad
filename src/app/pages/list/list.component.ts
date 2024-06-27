import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';
import { NgForm } from '@angular/forms';
import {faPenToSquare, faPlus, faTrashCan, faUserGroup, faX} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  addUserModalVisible = false;
  deleteUserId: number | null = null;
  deleteConfirmationVisible = false;
  currentUser: User = { id: 0, first_name: '', last_name: '', email: '', avatar: '' };
  editMode = false;
  faUserGroup = faUserGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  confirmDeleteUser(userId: number) {
    this.deleteUserId = userId;
    this.deleteConfirmationVisible = true;
  }

  closeDeleteConfirmationModal() {
    this.deleteConfirmationVisible = false;
    this.deleteUserId = null;
  }

  deleteUser() {
    if (this.deleteUserId) {
      this.userService.deleteUser(this.deleteUserId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== this.deleteUserId);
        this.closeDeleteConfirmationModal();
      });
    }
  }

  openAddUserModal() {
    this.currentUser = { id: 0, first_name: '', last_name: '', email: '', avatar: '' };
    this.editMode = false;
    this.addUserModalVisible = true;
  }

  openEditUserModal(user: User) {
    this.currentUser = { ...user };
    this.editMode = true;
    this.addUserModalVisible = true;
  }

  closeAddUserModal() {
    this.addUserModalVisible = false;
  }

  onSubmit(addUserForm: NgForm) {
    if (addUserForm.valid) {
      if (this.editMode) {
        this.userService.updateUser(this.currentUser).subscribe((updatedUser: User) => {
          const index = this.users.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.closeAddUserModal();
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
          this.closeAddUserModal();
          addUserForm.resetForm();
        });
      }
    }
  }


  private getNextUserId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
  }

  private getRandomAvatar(): string {
    const avatarIndex = Math.floor(Math.random() * 12) + 6;
    return `https://reqres.in/img/faces/${avatarIndex}-image.jpg`;
  }

  protected readonly faPlus = faPlus;
  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faX = faX;
  protected readonly close = close;
}
