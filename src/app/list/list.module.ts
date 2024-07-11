import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListComponent } from "./list.component";
import { UserRowComponent } from "./user-row/user-row.component";
import { ListRoutingModule } from "./list-routing.module";

@NgModule({
    declarations: [
        ListComponent,
        UserRowComponent,
    ],
    imports: [
        CommonModule,
        ListRoutingModule
    ]
})
export class ListModule { }