import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//Components
import {FollowupFormComponent} from './followup-form/followup-form.component';
import { LogInFormComponent }  from './authorization/login-form.component';
import { PersonListComponent }  from './person-list/person-list.component';
import { PersonDetailComponent }  from './person-detail/person-detail.component';
import { ContactManagementSystemComponent }  from './contact-management-system/contact-management-system.component';
import { NameSearchBoxComponent }  from './name-search-box/name-search-box.component';
import { ContactLogHistoryComponent }  from './contact-log-history/contact-log-history.component';
import { LogContactComponent }  from './log-contact/log-contact.component';
import { ProgressBarComponent }  from './progress-bar/progress-bar.component';
import { ProgressUpdateComponent }  from './progress-update/progress-update.component';
import { ProgressHistoryComponent}  from './progress-history/progress-history.component';
import { PersonEditComponent}  from './person-edit/person-edit.component';
import { LogoutComponent}  from './logout/logout.component';
import { LoginModalComponent}  from './authorization/login-modal.component';
import { HintComponent}  from './hint/hint.component';


//Services
import {AuthorizationService} from './authorization/authorization.service';
import {AuthorizationGuard} from './authorization/authorization-guard.service';
import {FollowupFormService} from './followup-form/followup-form.service';
import { PersonDetailService }  from './person-detail/person-detail.service';
import { ContactManagementSystemService }  from './contact-management-system/contact-management-system.service';
import { ProgressUpdateService }  from './progress-update/progress-update.service';
import { ProgressHistoryService }  from './progress-history/progress-history.service';
import { PersonEditService}  from './person-edit/person-edit.service';


//Modules
import {MomentModule} from 'angular2-moment';

//Routes
import {routingMain} from './app.routing'; 

//Pipes
import {NameSearchPipe} from './pipes/search.pipe';
import {FilterByNamePipe} from './pipes/filter-by-name.pipe';
import {FilterByWhoMadeContactPipe} from './pipes/filter-by-who-made-contact.pipe';
import {FilterByContactTypePipe} from './pipes/filter-by-contact-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FollowupFormComponent,
    LogInFormComponent,
    PersonListComponent,
    ContactManagementSystemComponent,
    PersonDetailComponent,
    NameSearchBoxComponent,
    ContactLogHistoryComponent,
    LogContactComponent,
    ProgressBarComponent,
    ProgressUpdateComponent,
    ProgressHistoryComponent,
    PersonEditComponent,
    LogoutComponent,
    LoginModalComponent,
    HintComponent,
    NameSearchPipe,
    FilterByNamePipe,
    FilterByWhoMadeContactPipe,
    FilterByContactTypePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    routingMain,
  ],
  providers: [
    AuthorizationService, 
    FollowupFormService, 
    AuthorizationGuard, 
    ContactManagementSystemService, 
    PersonDetailService, 
    ProgressUpdateService, 
    ProgressHistoryService,
    PersonEditService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
