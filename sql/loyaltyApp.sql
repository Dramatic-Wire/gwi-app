create table users(
	id serial not null primary key,
	username text unique not null,
	first_name text not null,
    surname text not null,
    email text unique not null,
	password text not null,
    profile_picture text
);
create table businesses(
	id serial not null primary key,
	business_name text not null,
	owner_id int not null,
    category text not null,
    logo text,
    unique (business_name, owner_id),
    foreign key (owner_id) references users(id) on delete cascade
); 
create table loyalty_programmes(
	id serial not null primary key,
	business_id int not null,
	stamps int not null,
    reward text not null,
    valid_for text not null,
    foreign key (business_id) references businesses(id) on delete cascade
);
create table stamps(
	id serial not null primary key,
	customer_id int not null,
	lp_id int not null ,
    timestamp timestamp not null,
    redeemed text default 'false',
    expired text default 'false',
    foreign key (customer_id) references users(id) on delete cascade,
    foreign key (lp_id) references loyalty_programmes(id) on delete cascade
);