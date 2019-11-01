import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DurationPipe } from './util-pipes/duration.pipe';
import { IconLevelPipe } from './util-pipes/icon-level.pipe';

import {
    FmsAppSharedLibsModule,
    FmsAppSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';

@NgModule({
    imports: [
        FmsAppSharedLibsModule,
        FmsAppSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DurationPipe,
        IconLevelPipe
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        FmsAppSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        DurationPipe,
        IconLevelPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FmsAppSharedModule {}
