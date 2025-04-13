<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use App\Models\Cake;
use App\Models\InterestedEmail;
use App\Jobs\SendCakeNotificationEmail;

uses(RefreshDatabase::class);

it('can list cakes', function () {
    Cake::factory()->count(3)->create();

    $response = $this->getJson('/api/cakes');

    $response->assertOk()
             ->assertJsonCount(3, 'data');
});

it('can create a cake with interested emails', function () {
    $data = [
        'name' => 'Bolo de Morango',
        'weight' => 1500,
        'price' => 39.90,
        'quantity' => 5,
        'emails' => [
            'cliente1@example.com',
            'cliente2@example.com',
        ],
    ];

    $response = $this->postJson('/api/cakes', $data);

    $response->assertCreated()
             ->assertJsonFragment(['name' => 'Bolo de Morango']);

    $this->assertDatabaseHas('cakes', ['name' => 'Bolo de Morango']);
    $this->assertDatabaseCount('interested_emails', 2);
});

it('dispatches email jobs for interested emails', function () {
    Queue::fake();

    $data = [
        'name' => 'Bolo de Laranja',
        'weight' => 1200,
        'price' => 29.90,
        'quantity' => 2,
        'emails' => [
            'laranja1@example.com',
            'laranja2@example.com',
        ],
    ];

    $response = $this->postJson('/api/cakes', $data);

    $response->assertCreated();

    Queue::assertPushed(SendCakeNotificationEmail::class, 2);
});

it('requires a name when creating a cake', function () {
    $data = [
        'weight' => 1000,
        'price' => 25.5,
        'quantity' => 3,
        'emails' => ['teste@example.com'],
    ];

    $response = $this->postJson('/api/cakes', $data);

    $response->assertStatus(422)
             ->assertJsonValidationErrors('name');
});

it('requires price to be numeric and positive', function () {
    $data = [
        'name' => 'Bolo Teste',
        'weight' => 1000,
        'price' => -5,
        'quantity' => 2,
        'emails' => ['cliente@example.com'],
    ];

    $response = $this->postJson('/api/cakes', $data);

    $response->assertStatus(422)
             ->assertJsonValidationErrors('price');
});

it('validates email format for interested emails', function () {
    $data = [
        'name' => 'Bolo de Abacaxi',
        'weight' => 800,
        'price' => 30.00,
        'quantity' => 2,
        'emails' => ['not-an-email', 'tambem.nao'],
    ];

    $response = $this->postJson('/api/cakes', $data);

    $response->assertStatus(422)
             ->assertJsonValidationErrors(['emails.0', 'emails.1']);
});

it('can update a cake', function () {
    $cake = Cake::factory()->create([
        'name' => 'Bolo Antigo',
        'quantity' => 1,
    ]);

    $data = [
        'name' => 'Bolo Atualizado',
        'weight' => 1800,
        'price' => 42.90,
        'quantity' => 7,
    ];

    $response = $this->putJson("/api/cakes/{$cake->id}", $data);

    $response->assertOk()
             ->assertJsonFragment(['name' => 'Bolo Atualizado']);

    $this->assertDatabaseHas('cakes', ['name' => 'Bolo Atualizado']);
});

it('can delete a cake', function () {
    $cake = Cake::factory()->create();

    $response = $this->deleteJson("/api/cakes/{$cake->id}");

    $response->assertNoContent();

    $this->assertDatabaseMissing('cakes', ['id' => $cake->id]);
});

it('returns cake data using resource format', function () {
    $cake = Cake::factory()->create();

    $response = $this->getJson("/api/cakes/{$cake->id}");

    $response->assertOk()
             ->assertJsonStructure([
                 'data' => [
                     'id',
                     'name',
                     'weight',
                     'price',
                     'quantity',
                     'interested_emails',
                     'created_at',
                     'updated_at',
                 ]
             ]);
});
