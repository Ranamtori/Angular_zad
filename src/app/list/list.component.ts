import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { faUserGroup, faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AddEditUserComponent } from '../modals/addedit/addedit.component';
import { DeleteUserComponent } from '../modals/delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  faUserGroup = faUserGroup;

  modalRef: MdbModalRef<AddEditUserComponent> | null = null;
  deleteModalRef: MdbModalRef<DeleteUserComponent> | null = null;

  constructor(private userService: UserService, private modalService: MdbModalService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  openAddUserModal() {
    this.modalRef = this.modalService.open(AddEditUserComponent, {
      data: {
        editMode: false,
        currentUser: { id: 0, first_name: '', last_name: '', email: '', avatar: '' }
      }
    });

    this.modalRef.onClose.subscribe((result: any) => {
      if (result && result.user) {
        this.users.push(result.user);
      }
    });
  }

  openEditUserModal(user: User) {
    this.modalRef = this.modalService.open(AddEditUserComponent, {
      data: {
        editMode: true,
        currentUser: { ...user }
      }
    });

    this.modalRef.onClose.subscribe((result: any) => {
      if (result && result.user) {
        const index = this.users.findIndex(u => u.id === result.user.id);
        if (index !== -1) {
          this.users[index] = result.user;
        }
      }
    });
  }

  openDeleteUserModal(user: User) {
    this.deleteModalRef = this.modalService.open(DeleteUserComponent, {
      data: { user }
    });

    this.deleteModalRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        this.users = this.users.filter((u) => u.id !== user.id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
