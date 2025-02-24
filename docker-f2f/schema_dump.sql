--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: access_level; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.access_level (
    level character varying(31) NOT NULL,
    id uuid NOT NULL,
    version bigint NOT NULL,
    active boolean NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    modified_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.access_level OWNER TO f2fadmin;

--
-- Name: addition; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.addition (
    id uuid NOT NULL,
    version bigint NOT NULL,
    addition_number integer
);


ALTER TABLE public.addition OWNER TO f2fadmin;

--
-- Name: administrator; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.administrator (
    id uuid NOT NULL
);


ALTER TABLE public.administrator OWNER TO f2fadmin;

--
-- Name: allergen; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.allergen (
    id uuid NOT NULL,
    version bigint DEFAULT 0,
    name character varying(255)
);


ALTER TABLE public.allergen OWNER TO f2fadmin;

--
-- Name: composition; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.composition (
    id uuid NOT NULL,
    version bigint NOT NULL,
    flavour_id uuid
);


ALTER TABLE public.composition OWNER TO f2fadmin;

--
-- Name: composition_addition; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.composition_addition (
    composition_id uuid NOT NULL,
    addition_id uuid NOT NULL
);


ALTER TABLE public.composition_addition OWNER TO f2fadmin;

--
-- Name: composition_ingredient; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.composition_ingredient (
    composition_id uuid NOT NULL,
    ingredient_id uuid NOT NULL
);


ALTER TABLE public.composition_ingredient OWNER TO f2fadmin;

--
-- Name: flavour; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.flavour (
    id uuid NOT NULL,
    version bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.flavour OWNER TO f2fadmin;

--
-- Name: github_auth; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.github_auth (
    github_id character varying(255),
    user_id uuid NOT NULL
);


ALTER TABLE public.github_auth OWNER TO f2fadmin;

--
-- Name: google_auth; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.google_auth (
    google_id character varying(255),
    user_id uuid NOT NULL
);


ALTER TABLE public.google_auth OWNER TO f2fadmin;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.ingredient (
    id uuid NOT NULL,
    version bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.ingredient OWNER TO f2fadmin;

--
-- Name: label; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.label (
    id uuid NOT NULL,
    version bigint NOT NULL,
    durability character varying(255),
    image bytea,
    instructions_after_opening character varying(255),
    preparation character varying(255),
    storage character varying(255)
);


ALTER TABLE public.label OWNER TO f2fadmin;

--
-- Name: label_allergen; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.label_allergen (
    label_id uuid NOT NULL,
    allergen_id uuid NOT NULL
);


ALTER TABLE public.label_allergen OWNER TO f2fadmin;

--
-- Name: nutritional_index; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.nutritional_index (
    id uuid NOT NULL,
    version bigint NOT NULL,
    index_value integer,
    legend character varying(255)
);


ALTER TABLE public.nutritional_index OWNER TO f2fadmin;

--
-- Name: nutritional_value; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.nutritional_value (
    id uuid NOT NULL,
    version bigint NOT NULL,
    nrv double precision,
    quantity double precision,
    nutritional_value_name_id uuid,
    unit_id uuid
);


ALTER TABLE public.nutritional_value OWNER TO f2fadmin;

--
-- Name: nutritional_value_group; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.nutritional_value_group (
    id uuid NOT NULL,
    version bigint NOT NULL,
    group_name character varying(255)
);


ALTER TABLE public.nutritional_value_group OWNER TO f2fadmin;

--
-- Name: nutritional_value_name; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.nutritional_value_name (
    id uuid NOT NULL,
    version bigint NOT NULL,
    name character varying(255),
    group_id uuid
);


ALTER TABLE public.nutritional_value_name OWNER TO f2fadmin;

--
-- Name: package_type; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.package_type (
    id uuid NOT NULL,
    version bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.package_type OWNER TO f2fadmin;

--
-- Name: personal_data; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.personal_data (
    email character varying(50) NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.personal_data OWNER TO f2fadmin;

--
-- Name: portion; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.portion (
    id uuid NOT NULL,
    version bigint NOT NULL,
    portion_quantity integer,
    unit_id uuid
);


ALTER TABLE public.portion OWNER TO f2fadmin;

--
-- Name: producer; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.producer (
    id uuid NOT NULL,
    version bigint NOT NULL,
    nip character varying(255),
    rmsd integer,
    address character varying(255),
    contact character varying(255),
    country_code integer,
    name character varying(255)
);


ALTER TABLE public.producer OWNER TO f2fadmin;

--
-- Name: product; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product (
    id uuid NOT NULL,
    version bigint NOT NULL,
    country text,
    ean character varying(13) NOT NULL,
    product_description character varying(255),
    product_name character varying(255) NOT NULL,
    product_quantity integer,
    composition_id uuid,
    label_id uuid,
    package_type_id uuid,
    portion_id uuid,
    producer_id uuid,
    unit_id uuid,
    favorite_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.product OWNER TO f2fadmin;

--
-- Name: product_index; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product_index (
    id uuid NOT NULL,
    version bigint NOT NULL,
    index_name character varying(255),
    index_value integer
);


ALTER TABLE public.product_index OWNER TO f2fadmin;

--
-- Name: product_nutritional_index; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product_nutritional_index (
    product_id uuid NOT NULL,
    nutritional_index_id uuid NOT NULL
);


ALTER TABLE public.product_nutritional_index OWNER TO f2fadmin;

--
-- Name: product_nutritional_value; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product_nutritional_value (
    product_id uuid NOT NULL,
    nutritional_value_id uuid NOT NULL
);


ALTER TABLE public.product_nutritional_value OWNER TO f2fadmin;

--
-- Name: product_product_index; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product_product_index (
    product_id uuid NOT NULL,
    product_index_id uuid NOT NULL
);


ALTER TABLE public.product_product_index OWNER TO f2fadmin;

--
-- Name: product_rating; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.product_rating (
    product_id uuid NOT NULL,
    rating_id uuid NOT NULL
);


ALTER TABLE public.product_rating OWNER TO f2fadmin;

--
-- Name: rating; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.rating (
    id uuid NOT NULL,
    version bigint NOT NULL,
    group_name character varying(255),
    name character varying(255)
);


ALTER TABLE public.rating OWNER TO f2fadmin;

--
-- Name: unit; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.unit (
    id uuid NOT NULL,
    version bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.unit OWNER TO f2fadmin;

--
-- Name: user_access_level; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_access_level (
    id uuid NOT NULL
);


ALTER TABLE public.user_access_level OWNER TO f2fadmin;

--
-- Name: user_favorite_product; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_favorite_product (
    user_id uuid NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.user_favorite_product OWNER TO f2fadmin;

--
-- Name: user_preference; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference (
    id uuid NOT NULL,
    version bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    modified_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.user_preference OWNER TO f2fadmin;

--
-- Name: user_preference_allergen; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_allergen (
    user_preference_id uuid NOT NULL,
    allergen_id uuid NOT NULL
);


ALTER TABLE public.user_preference_allergen OWNER TO f2fadmin;

--
-- Name: user_preference_negative_nutritional_value_name; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_negative_nutritional_value_name (
    user_preference_id uuid NOT NULL,
    nutritional_value_name_id uuid NOT NULL
);


ALTER TABLE public.user_preference_negative_nutritional_value_name OWNER TO f2fadmin;

--
-- Name: user_preference_negative_package_type; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_negative_package_type (
    user_preference_id uuid NOT NULL,
    package_type_id uuid NOT NULL
);


ALTER TABLE public.user_preference_negative_package_type OWNER TO f2fadmin;

--
-- Name: user_preference_negative_rating; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_negative_rating (
    user_preference_id uuid NOT NULL,
    rating_id uuid NOT NULL
);


ALTER TABLE public.user_preference_negative_rating OWNER TO f2fadmin;

--
-- Name: user_preference_nutritional_value_name; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_nutritional_value_name (
    user_preference_id uuid NOT NULL,
    nutritional_value_name_id uuid NOT NULL
);


ALTER TABLE public.user_preference_nutritional_value_name OWNER TO f2fadmin;

--
-- Name: user_preference_positive_nutritional_value_name; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_positive_nutritional_value_name (
    user_preference_id uuid NOT NULL,
    nutritional_value_name_id uuid NOT NULL
);


ALTER TABLE public.user_preference_positive_nutritional_value_name OWNER TO f2fadmin;

--
-- Name: user_preference_positive_package_type; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_positive_package_type (
    user_preference_id uuid NOT NULL,
    package_type_id uuid NOT NULL
);


ALTER TABLE public.user_preference_positive_package_type OWNER TO f2fadmin;

--
-- Name: user_preference_positive_rating; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.user_preference_positive_rating (
    user_preference_id uuid NOT NULL,
    rating_id uuid NOT NULL
);


ALTER TABLE public.user_preference_positive_rating OWNER TO f2fadmin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: f2fadmin
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    version bigint NOT NULL,
    username character varying(50) NOT NULL,
    user_preference_id uuid,
    created_at timestamp(6) without time zone NOT NULL,
    modified_at timestamp(6) without time zone NOT NULL,
    language character varying(255) NOT NULL,
    blocked boolean NOT NULL,
    CONSTRAINT users_language_check CHECK (((language)::text = ANY ((ARRAY['PL'::character varying, 'EN'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO f2fadmin;

--
-- Name: access_level access_level_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.access_level
    ADD CONSTRAINT access_level_pkey PRIMARY KEY (id);


--
-- Name: addition addition_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.addition
    ADD CONSTRAINT addition_pkey PRIMARY KEY (id);


--
-- Name: administrator administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.administrator
    ADD CONSTRAINT administrator_pkey PRIMARY KEY (id);


--
-- Name: allergen allergen_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.allergen
    ADD CONSTRAINT allergen_pkey PRIMARY KEY (id);


--
-- Name: composition composition_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition
    ADD CONSTRAINT composition_pkey PRIMARY KEY (id);


--
-- Name: flavour flavour_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.flavour
    ADD CONSTRAINT flavour_pkey PRIMARY KEY (id);


--
-- Name: github_auth github_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.github_auth
    ADD CONSTRAINT github_auth_pkey PRIMARY KEY (user_id);


--
-- Name: google_auth google_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.google_auth
    ADD CONSTRAINT google_auth_pkey PRIMARY KEY (user_id);


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (id);


--
-- Name: label_allergen label_allergen_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.label_allergen
    ADD CONSTRAINT label_allergen_pkey PRIMARY KEY (label_id, allergen_id);


--
-- Name: label label_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (id);


--
-- Name: nutritional_index nutritional_index_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_index
    ADD CONSTRAINT nutritional_index_pkey PRIMARY KEY (id);


--
-- Name: nutritional_value_group nutritional_value_group_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value_group
    ADD CONSTRAINT nutritional_value_group_pkey PRIMARY KEY (id);


--
-- Name: nutritional_value_name nutritional_value_name_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value_name
    ADD CONSTRAINT nutritional_value_name_pkey PRIMARY KEY (id);


--
-- Name: nutritional_value nutritional_value_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value
    ADD CONSTRAINT nutritional_value_pkey PRIMARY KEY (id);


--
-- Name: package_type package_type_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.package_type
    ADD CONSTRAINT package_type_pkey PRIMARY KEY (id);


--
-- Name: personal_data personal_data_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.personal_data
    ADD CONSTRAINT personal_data_pkey PRIMARY KEY (user_id);


--
-- Name: portion portion_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.portion
    ADD CONSTRAINT portion_pkey PRIMARY KEY (id);


--
-- Name: producer producer_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT producer_pkey PRIMARY KEY (id);


--
-- Name: product_index product_index_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_index
    ADD CONSTRAINT product_index_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- Name: access_level uk5w5295yym936seba983kb66l6; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.access_level
    ADD CONSTRAINT uk5w5295yym936seba983kb66l6 UNIQUE (user_id, level);


--
-- Name: personal_data uk8l7khabpjeh7aui8h4vlkw3kb; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.personal_data
    ADD CONSTRAINT uk8l7khabpjeh7aui8h4vlkw3kb UNIQUE (email);


--
-- Name: github_auth uk9jeqda4ko3hthgjixvremjepf; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.github_auth
    ADD CONSTRAINT uk9jeqda4ko3hthgjixvremjepf UNIQUE (github_id);


--
-- Name: users ukcbbmwpjy05ouwuvkme05054l7; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukcbbmwpjy05ouwuvkme05054l7 UNIQUE (user_preference_id);


--
-- Name: google_auth uklivnoc3tgcymh4sx3yykdx7kw; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.google_auth
    ADD CONSTRAINT uklivnoc3tgcymh4sx3yykdx7kw UNIQUE (google_id);


--
-- Name: product ukqu0bk3weipog56g273lagw833; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT ukqu0bk3weipog56g273lagw833 UNIQUE (portion_id);


--
-- Name: product ukque92kabec66in10i7o13unxt; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT ukque92kabec66in10i7o13unxt UNIQUE (label_id);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: product ukrnmhslfsjabohm1uo064rxsde; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT ukrnmhslfsjabohm1uo064rxsde UNIQUE (composition_id);


--
-- Name: unit unit_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (id);


--
-- Name: user_access_level user_access_level_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_access_level
    ADD CONSTRAINT user_access_level_pkey PRIMARY KEY (id);


--
-- Name: user_favorite_product user_favorite_product_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_favorite_product
    ADD CONSTRAINT user_favorite_product_pkey PRIMARY KEY (user_id, product_id);


--
-- Name: user_preference_allergen user_preference_allergen_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_allergen
    ADD CONSTRAINT user_preference_allergen_pkey PRIMARY KEY (user_preference_id, allergen_id);


--
-- Name: user_preference_negative_nutritional_value_name user_preference_negative_nutritional_value_name_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_nutritional_value_name
    ADD CONSTRAINT user_preference_negative_nutritional_value_name_pkey PRIMARY KEY (user_preference_id, nutritional_value_name_id);


--
-- Name: user_preference_negative_package_type user_preference_negative_package_type_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_package_type
    ADD CONSTRAINT user_preference_negative_package_type_pkey PRIMARY KEY (user_preference_id, package_type_id);


--
-- Name: user_preference_negative_rating user_preference_negative_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_rating
    ADD CONSTRAINT user_preference_negative_rating_pkey PRIMARY KEY (user_preference_id, rating_id);


--
-- Name: user_preference_nutritional_value_name user_preference_nutritional_value_name_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_nutritional_value_name
    ADD CONSTRAINT user_preference_nutritional_value_name_pkey PRIMARY KEY (user_preference_id, nutritional_value_name_id);


--
-- Name: user_preference user_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_pkey PRIMARY KEY (id);


--
-- Name: user_preference_positive_nutritional_value_name user_preference_positive_nutritional_value_name_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_nutritional_value_name
    ADD CONSTRAINT user_preference_positive_nutritional_value_name_pkey PRIMARY KEY (user_preference_id, nutritional_value_name_id);


--
-- Name: user_preference_positive_package_type user_preference_positive_package_type_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_package_type
    ADD CONSTRAINT user_preference_positive_package_type_pkey PRIMARY KEY (user_preference_id, package_type_id);


--
-- Name: user_preference_positive_rating user_preference_positive_rating_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_rating
    ADD CONSTRAINT user_preference_positive_rating_pkey PRIMARY KEY (user_preference_id, rating_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_access_level_user_id; Type: INDEX; Schema: public; Owner: f2fadmin
--

CREATE INDEX idx_access_level_user_id ON public.access_level USING btree (user_id);


--
-- Name: product fk1p03nfq9a930ijjl6p3ykalmh; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk1p03nfq9a930ijjl6p3ykalmh FOREIGN KEY (producer_id) REFERENCES public.producer(id);


--
-- Name: user_preference_positive_rating fk1qy62ac9nr3du7hrnya7ac8bi; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_rating
    ADD CONSTRAINT fk1qy62ac9nr3du7hrnya7ac8bi FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: product fk1y0k71bl5w5nt6gvycpovxabo; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk1y0k71bl5w5nt6gvycpovxabo FOREIGN KEY (composition_id) REFERENCES public.composition(id);


--
-- Name: user_preference_negative_rating fk29orkyeqvd0djuuv34si8xnql; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_rating
    ADD CONSTRAINT fk29orkyeqvd0djuuv34si8xnql FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: user_preference_positive_rating fk2bcxdqvu0j5762e3wyv6r3415; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_rating
    ADD CONSTRAINT fk2bcxdqvu0j5762e3wyv6r3415 FOREIGN KEY (rating_id) REFERENCES public.rating(id);


--
-- Name: user_preference_negative_rating fk2ikn0g02ldcj313r2xa02kq11; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_rating
    ADD CONSTRAINT fk2ikn0g02ldcj313r2xa02kq11 FOREIGN KEY (rating_id) REFERENCES public.rating(id);


--
-- Name: user_preference_allergen fk5ts89nl4p1qk4w8ckpgc43g34; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_allergen
    ADD CONSTRAINT fk5ts89nl4p1qk4w8ckpgc43g34 FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: composition_addition fk6jaxww8isu3be2pucnda0gntu; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition_addition
    ADD CONSTRAINT fk6jaxww8isu3be2pucnda0gntu FOREIGN KEY (composition_id) REFERENCES public.composition(id);


--
-- Name: product fk701krjgyggdd2u734jdff195k; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk701krjgyggdd2u734jdff195k FOREIGN KEY (package_type_id) REFERENCES public.package_type(id);


--
-- Name: github_auth fk73ajjfbjla1m3ldj0w3khvaq7; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.github_auth
    ADD CONSTRAINT fk73ajjfbjla1m3ldj0w3khvaq7 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: composition fk77b1uyfaq4xxuwixel01j6mkf; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition
    ADD CONSTRAINT fk77b1uyfaq4xxuwixel01j6mkf FOREIGN KEY (flavour_id) REFERENCES public.flavour(id);


--
-- Name: google_auth fk7rqn5i3xchprqf5l6csjwn09l; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.google_auth
    ADD CONSTRAINT fk7rqn5i3xchprqf5l6csjwn09l FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product fk7rtjn4smhd1itljos5nd70wr8; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk7rtjn4smhd1itljos5nd70wr8 FOREIGN KEY (portion_id) REFERENCES public.portion(id);


--
-- Name: user_access_level fk7x3ide8g87h5q9vyv40fuak13; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_access_level
    ADD CONSTRAINT fk7x3ide8g87h5q9vyv40fuak13 FOREIGN KEY (id) REFERENCES public.access_level(id);


--
-- Name: user_preference_nutritional_value_name fk8g1s6g8sdcs03m6hqf4yi81kx; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_nutritional_value_name
    ADD CONSTRAINT fk8g1s6g8sdcs03m6hqf4yi81kx FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: nutritional_value_name fk8whfsxi3hj11bcy5ly51r3yr; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value_name
    ADD CONSTRAINT fk8whfsxi3hj11bcy5ly51r3yr FOREIGN KEY (group_id) REFERENCES public.nutritional_value_group(id);


--
-- Name: user_preference_negative_nutritional_value_name fk9lvlve1fbbol2tnxox07vqgkc; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_nutritional_value_name
    ADD CONSTRAINT fk9lvlve1fbbol2tnxox07vqgkc FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: product_product_index fkav0v4wls1k6mqndgn73xlpsov; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_product_index
    ADD CONSTRAINT fkav0v4wls1k6mqndgn73xlpsov FOREIGN KEY (product_index_id) REFERENCES public.product_index(id);


--
-- Name: product_nutritional_value fkbm7e5dca2wba1ts887y35dykp; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_nutritional_value
    ADD CONSTRAINT fkbm7e5dca2wba1ts887y35dykp FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: user_favorite_product fkbmju46gv456qs9qf6w5ocg4d0; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_favorite_product
    ADD CONSTRAINT fkbmju46gv456qs9qf6w5ocg4d0 FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: user_preference_negative_package_type fke74q9j9nsgp92g6u570wggive; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_package_type
    ADD CONSTRAINT fke74q9j9nsgp92g6u570wggive FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: user_preference_negative_nutritional_value_name fkej4kyjllaktlqs4n62kjsfkp; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_nutritional_value_name
    ADD CONSTRAINT fkej4kyjllaktlqs4n62kjsfkp FOREIGN KEY (nutritional_value_name_id) REFERENCES public.nutritional_value_name(id);


--
-- Name: product_product_index fkh2w1gvsk75yaukyaeymckif9j; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_product_index
    ADD CONSTRAINT fkh2w1gvsk75yaukyaeymckif9j FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_nutritional_index fkh6ndx27mrsvk5qcgw5jv15sj; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_nutritional_index
    ADD CONSTRAINT fkh6ndx27mrsvk5qcgw5jv15sj FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: user_preference_negative_package_type fki8ms4d4i767v1mkfp1shtp96b; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_negative_package_type
    ADD CONSTRAINT fki8ms4d4i767v1mkfp1shtp96b FOREIGN KEY (package_type_id) REFERENCES public.package_type(id);


--
-- Name: user_preference_allergen fkjb7hwv9s5am300fiblshu2t45; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_allergen
    ADD CONSTRAINT fkjb7hwv9s5am300fiblshu2t45 FOREIGN KEY (allergen_id) REFERENCES public.allergen(id);


--
-- Name: user_preference_positive_package_type fkjchm6b2jykty6v3ymr8k8sdwm; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_package_type
    ADD CONSTRAINT fkjchm6b2jykty6v3ymr8k8sdwm FOREIGN KEY (package_type_id) REFERENCES public.package_type(id);


--
-- Name: personal_data fkku8qp4a2xp17yobsg9gxmws1t; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.personal_data
    ADD CONSTRAINT fkku8qp4a2xp17yobsg9gxmws1t FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product fkl41nix15pg9kv38mw5y00wkbl; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fkl41nix15pg9kv38mw5y00wkbl FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: user_preference_nutritional_value_name fkm9e55mdibhad0laoc19mgfen6; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_nutritional_value_name
    ADD CONSTRAINT fkm9e55mdibhad0laoc19mgfen6 FOREIGN KEY (nutritional_value_name_id) REFERENCES public.nutritional_value_name(id);


--
-- Name: composition_ingredient fkmlyx7bueuo2m9yfd90djwqb73; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition_ingredient
    ADD CONSTRAINT fkmlyx7bueuo2m9yfd90djwqb73 FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id);


--
-- Name: composition_addition fkmnrd9en7ly2kbgvgfpb0pq51o; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition_addition
    ADD CONSTRAINT fkmnrd9en7ly2kbgvgfpb0pq51o FOREIGN KEY (addition_id) REFERENCES public.addition(id);


--
-- Name: portion fkmpj57foeppmcerprk4lmwa0au; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.portion
    ADD CONSTRAINT fkmpj57foeppmcerprk4lmwa0au FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: administrator fkmsnxouqpp6d2x12i9gal38n1p; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.administrator
    ADD CONSTRAINT fkmsnxouqpp6d2x12i9gal38n1p FOREIGN KEY (id) REFERENCES public.access_level(id);


--
-- Name: nutritional_value fknmswwbt3w7c1370o5a1r6lpkb; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value
    ADD CONSTRAINT fknmswwbt3w7c1370o5a1r6lpkb FOREIGN KEY (nutritional_value_name_id) REFERENCES public.nutritional_value_name(id);


--
-- Name: user_preference_positive_nutritional_value_name fkovs00to04c39xjeecsf1v6sap; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_nutritional_value_name
    ADD CONSTRAINT fkovs00to04c39xjeecsf1v6sap FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: user_preference_positive_package_type fkp0bglcmypbufddfyc5oxp5s6v; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_package_type
    ADD CONSTRAINT fkp0bglcmypbufddfyc5oxp5s6v FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: users fkp34x83qe8gvolujful4fm3767; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fkp34x83qe8gvolujful4fm3767 FOREIGN KEY (user_preference_id) REFERENCES public.user_preference(id);


--
-- Name: product fkpmvdfc7a1rwel764w75j5g2y5; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fkpmvdfc7a1rwel764w75j5g2y5 FOREIGN KEY (label_id) REFERENCES public.label(id);


--
-- Name: product_rating fkpqmijcrmp9hlm7hen2ynve96v; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_rating
    ADD CONSTRAINT fkpqmijcrmp9hlm7hen2ynve96v FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_nutritional_index fkq8k2yoe6ekv7h0btsqcg9i377; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_nutritional_index
    ADD CONSTRAINT fkq8k2yoe6ekv7h0btsqcg9i377 FOREIGN KEY (nutritional_index_id) REFERENCES public.nutritional_index(id);


--
-- Name: user_preference_positive_nutritional_value_name fkqfrg7go4rpja5g0y0g3m2df5t; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_preference_positive_nutritional_value_name
    ADD CONSTRAINT fkqfrg7go4rpja5g0y0g3m2df5t FOREIGN KEY (nutritional_value_name_id) REFERENCES public.nutritional_value_name(id);


--
-- Name: user_favorite_product fkqw2899ey03dphdq66ry3aii9u; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.user_favorite_product
    ADD CONSTRAINT fkqw2899ey03dphdq66ry3aii9u FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product_rating fkr0bqllaecmhkrm3kw4eug3jhh; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_rating
    ADD CONSTRAINT fkr0bqllaecmhkrm3kw4eug3jhh FOREIGN KEY (rating_id) REFERENCES public.rating(id);


--
-- Name: access_level fkrs411lhb9ry6pq9on4i4d41m9; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.access_level
    ADD CONSTRAINT fkrs411lhb9ry6pq9on4i4d41m9 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: composition_ingredient fkrwg4ax3fe9c99rc5r6s2f95al; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.composition_ingredient
    ADD CONSTRAINT fkrwg4ax3fe9c99rc5r6s2f95al FOREIGN KEY (composition_id) REFERENCES public.composition(id);


--
-- Name: nutritional_value fkt5mm8ojcy07vywvi9f1sxw611; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.nutritional_value
    ADD CONSTRAINT fkt5mm8ojcy07vywvi9f1sxw611 FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: product_nutritional_value fktnwek2ek4bmwfwnwnbpns4hmm; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.product_nutritional_value
    ADD CONSTRAINT fktnwek2ek4bmwfwnwnbpns4hmm FOREIGN KEY (nutritional_value_id) REFERENCES public.nutritional_value(id);


--
-- Name: label_allergen label_allergen_allergen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.label_allergen
    ADD CONSTRAINT label_allergen_allergen_id_fkey FOREIGN KEY (allergen_id) REFERENCES public.allergen(id);


--
-- Name: label_allergen label_allergen_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: f2fadmin
--

ALTER TABLE ONLY public.label_allergen
    ADD CONSTRAINT label_allergen_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.label(id);


--
-- PostgreSQL database dump complete
--

