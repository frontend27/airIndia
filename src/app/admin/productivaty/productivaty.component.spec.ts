import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivatyComponent } from './productivaty.component';

describe('ProductivatyComponent', () => {
  let component: ProductivatyComponent;
  let fixture: ComponentFixture<ProductivatyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductivatyComponent]
    });
    fixture = TestBed.createComponent(ProductivatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
