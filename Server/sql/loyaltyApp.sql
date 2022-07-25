create table users(
	id serial not null primary key,
	username text not null unique,
	first_name text not null,
    surname text not null,
    email text not null unique,
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
    foreign key (owner_id) references users(id)
); 
create table loyalty_programmes(
	id serial not null primary key,
	business_id int not null,
	stamps text not null,
    reward text not null,
    valid_for text not null,
    foreign key (business_id) references businesses(id)
);
create table stamps(
	id serial not null primary key,
	customer_id int not null,
	lp_id int not null,
    timestamp text not null,
    redeemed text,
    foreign key (customer_id) references users(id),
    foreign key (lp_id) references loyalty_programmes(id)
);