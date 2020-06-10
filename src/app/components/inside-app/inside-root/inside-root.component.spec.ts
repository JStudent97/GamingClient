import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideRootComponent } from './inside-root.component';

describe('InsideRootComponent', () => {
  let component: InsideRootComponent;
  let fixture: ComponentFixture<InsideRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
